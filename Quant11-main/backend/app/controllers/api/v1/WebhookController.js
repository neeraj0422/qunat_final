const mongoose = require("mongoose");
const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { sendNotification } = require("../../../utils/NotificationService");
const {
  StrategyModel,
  TradesModel,
  NotificationModel,
  FollowModel,
  StrategyTransactionModel,
  DeviceTokenModel,
  AssetsModel,
  UserModel,
  StrategyTradesModel,
} = require("../../../models");
const { sendEmail } = require("../../../utils/EmailService");

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const createNotification = async (
  matchedStrategy,
  userFollowData,
  price,
  action
) => {
  await NotificationModel.create({
    strategy_id: matchedStrategy._id,
    user_id: userFollowData.user_id,
    asset_id: matchedStrategy.asset_id,
    action: action,
    price: price,
    time: new Date(),
    is_read: 0,
  });
  const assetData = await AssetsModel.findOne({
    _id: matchedStrategy.asset_id,
    deleted_at: null,
  });
  if (assetData) {
    const user = await UserModel.findOne({
      _id: mongoose.Types.ObjectId(userFollowData.user_id),
    });
    if (user) {
      const message = `${capitalizeFirstLetter(action)} ${
        assetData.asset_name
      } at ${price}`;

      if (user.push_notification) {
        const deviceToken = await DeviceTokenModel.find({
          user_id: mongoose.Types.ObjectId(userFollowData.user_id),
          type: "web",
          deleted_at: null,
        }).select("device_token");
        const deviceTokensArray = deviceToken.map((item) => item.device_token);
        if (deviceTokensArray.length) {
          await sendNotification(message, deviceTokensArray);
        }
      }

      const strategy = await StrategyModel.findOne({
        _id: matchedStrategy._id,
        deleted_at: null,
      });

      if (user.email_notification) {
        const dynamicData = {
          title: `${action === "buy" ? "Buy" : "Sell"} Alert`,
          line1: `Hello ${user.first_name}`,
          line2: `${action === "buy" ? "Buy" : "Sell"} Alert: ${
            assetData.ticker_symbol
          }`,
          line3: `by ${strategy.strategy_name} Strategy price at ${price}`,
          line4: ``,
          line5: "",
          box: "",
          link: "",
          email_ignore: "",
          contact_title: "Contact",
          address: "Quant Trade fintech Inc.",
          contact: "support@quant11.com",
          lockImage: `<img
           align="center"
           border="0"
           src="https://quant11images.s3.amazonaws.com/email-assets/image-7-bell.png"
           alt="Image-7 bell icon"
           title="Image"
           style="
                  outline: none; text-decoration: none;
                  -ms-interpolation-mode: bicubic; clear:
                  both; display: inline-block !important;
                  border: none; height: auto; float: none;
                  width: 8%; max-width: 46.4px; "
           width="46.4"
         />`,
        };
        await sendEmail(
          user.email,
          `${action === "buy" ? "Buy" : "Sell"} Alert: ${
            assetData.ticker_symbol
          }`,
          dynamicData
        );

        //       await sendEmail(
        //         user.email,
        //         "Notification Alert",
        //         `
        //   <html>
        //     <body>
        //       <p>Hello ${user.first_name}</p>
        //       <p>${message}</p>
        //     </body>
        //   </html>
        // `
        //       );
      }
    }
  }
  return true;
};

const createPyramidTrade = async (
  matchedStrategy,
  userFollowData,
  price,
  action
) => {
  if (matchedStrategy && Number(matchedStrategy.current_balance) > 0) {
    const pyStack = matchedStrategy.pyramiding_stack;
    if (Number(pyStack) > 0) {
      let sBalance = (matchedStrategy.current_balance * pyStack) / 100;
      if (Number(Math.floor(sBalance / price)) > 0) {
        await TradesModel.create({
          strategy_id: matchedStrategy._id,
          user_id: userFollowData.user_id,
          asset_id: matchedStrategy.asset_id,
          action: action,
          open_price: action === "buy" ? price : null,
          open_time: action === "buy" ? new Date() : null,
          lot_size: Math.floor(sBalance / price),
          close_price: action === "sell" ? price : null,
          close_time: action === "sell" ? new Date() : null,
          status: "open",
        });

        await createNotification(
          matchedStrategy,
          userFollowData,
          price,
          action
        );
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const createStrategyPyramidTrade = async (matchedStrategy, price, action) => {
  if (matchedStrategy && Number(matchedStrategy.current_balance) > 0) {
    const pyStack = matchedStrategy.pyramiding_stack;
    if (Number(pyStack) > 0) {
      let sBalance = (matchedStrategy.current_balance * pyStack) / 100;
      if (Number(Math.floor(sBalance / price)) > 0) {
        await StrategyTradesModel.create({
          strategy_id: matchedStrategy._id,
          asset_id: matchedStrategy.asset_id,
          action: action,
          open_price: action === "buy" ? price : null,
          open_time: action === "buy" ? new Date() : null,
          lot_size: Math.floor(sBalance / price),
          close_price: action === "sell" ? price : null,
          close_time: action === "sell" ? new Date() : null,
          status: "open",
        });
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const createNewStrategyTrade = async (strategyData, price, action) => {
  if (Number(strategyData.current_balance) > 0) {
    let newCalculatedLotSize = Math.floor(strategyData.current_balance / price);
    if (Number(newCalculatedLotSize) > 0) {
      await StrategyTradesModel.create({
        strategy_id: strategyData._id,
        asset_id: strategyData.asset_id,
        action: action,
        open_price: action === "buy" ? price : null,
        open_time: action === "buy" ? new Date() : null,
        lot_size: newCalculatedLotSize,
        close_price: action === "sell" ? price : null,
        close_time: action === "sell" ? new Date() : null,
        status: "open",
        profit_loss: 0,
      });
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const createNewTrade = async (strategyData, userFollowData, price, action) => {
  if (Number(strategyData.current_balance) > 0) {
    let newCalculatedLotSize = Math.floor(strategyData.current_balance / price);
    if (Number(newCalculatedLotSize) > 0) {
      await TradesModel.create({
        strategy_id: strategyData._id,
        user_id: userFollowData.user_id,
        asset_id: strategyData.asset_id,
        action: action,
        open_price: action === "buy" ? price : null,
        open_time: action === "buy" ? new Date() : null,
        lot_size: newCalculatedLotSize,
        close_price: action === "sell" ? price : null,
        close_time: action === "sell" ? new Date() : null,
        status: "open",
        profit_loss: 0,
      });

      // Send a notification to the user
      await createNotification(strategyData, userFollowData, price, action);
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const createStrategyTrades = async (strategy, price, action) => {
  if (strategy.inverse) {
    if (strategy.pyramiding) {
      const cOpen = await StrategyTradesModel.find({
        strategy_id: strategy._id,
        status: "open",
        deleted_at: null,
      });
      if (cOpen.length) {
        // Already active trades are there
        const lastOpenTrade = cOpen[cOpen.length - 1];
        if (lastOpenTrade.action !== action) {
          // In case of different direction order comes
          for (let k = 0; k < cOpen.length; k++) {
            const m = cOpen[k];
            var PL = 0;
            var upData;
            if (m.action === "sell" && action === "buy") {
              PL = (m.close_price - price) * m.lot_size;
              upData = {
                status: "closed",
                open_price: price,
                open_time: new Date(),
                profit_loss: PL,
              };
            } else if (m.action === "buy" && action === "sell") {
              PL = (price - m.open_price) * m.lot_size;
              upData = {
                status: "closed",
                close_price: price,
                close_time: new Date(),
                profit_loss: PL,
              };
            }

            await StrategyTradesModel.updateOne(
              { _id: m._id },
              { $set: upData }
            );

            // await StrategyTransactionModel.create({
            //   strategy_id: strategy._id,
            //   profit_loss: PL,
            // });
            const cBalance = await StrategyModel.findOne({
              _id: strategy._id,
              deleted_at: null,
            });
            await StrategyModel.updateOne(
              { _id: strategy._id },
              { $set: { current_balance: cBalance.current_balance + PL } }
            );
          }
          const sData = await StrategyModel.findOne({
            _id: strategy._id,
            deleted_at: null,
          });
          await createStrategyPyramidTrade(sData, price, action);
          return { status: true, message: STATUS_MESSAGES.SUCCESS };
        } else {
          if (Number(strategy.current_balance) <= 0) {
            return { status: false, message: STATUS_MESSAGES.LOW_BALANCE };
          }

          let bal =
            (strategy.current_balance * strategy.pyramiding_stack) / 100;
          let remaining_balance = await openTradeConsumedBalance(
            cOpen,
            strategy
          );
          // console.log(remaining_balance);
          if (
            Number(strategy.pyramiding_stack) <= 0 ||
            bal <= 0 ||
            remaining_balance < bal
          ) {
            return {
              status: false,
              message: STATUS_MESSAGES.INVALID_PYRAMIDING_STACK,
            };
          }

          if (Number(Math.floor(bal / price)) <= 0) {
            return { status: false, message: STATUS_MESSAGES.LOW_BALANCE };
          }

          await createStrategyPyramidTrade(strategy, price, action);
          return { status: true, message: STATUS_MESSAGES.SUCCESS };
        }
      } else {
        //No open trade in pyramiding
        if (Number(strategy.current_balance) <= 0) {
          return { status: false, message: STATUS_MESSAGES.LOW_BALANCE };
        }

        let bal = (strategy.current_balance * strategy.pyramiding_stack) / 100;
        if (Number(strategy.pyramiding_stack) <= 0 || bal <= 0) {
          return {
            status: false,
            message: STATUS_MESSAGES.INVALID_PYRAMIDING_STACK,
          };
        }

        if (Number(Math.floor(bal / price)) <= 0) {
          return { status: false, message: STATUS_MESSAGES.LOW_BALANCE };
        }

        await createStrategyPyramidTrade(strategy, price, action);
        return { status: true, message: STATUS_MESSAGES.SUCCESS };
      }
    } else {
      const currentOpenTrade = await StrategyTradesModel.findOne({
        strategy_id: strategy._id,
        status: "open",
        deleted_at: null,
      });
      if (currentOpenTrade) {
        // Calculate profit_loss
        var profitLoss = 0;
        var updateData;
        if (currentOpenTrade.action === "sell") {
          profitLoss =
            (currentOpenTrade.close_price - price) * currentOpenTrade.lot_size;
          updateData = {
            status: "closed",
            open_price: price,
            open_time: new Date(),
            profit_loss: profitLoss,
          };
        } else {
          profitLoss =
            (price - currentOpenTrade.open_price) * currentOpenTrade.lot_size;
          updateData = {
            status: "closed",
            close_price: price,
            close_time: new Date(),
            profit_loss: profitLoss,
          };
        }

        await StrategyTradesModel.updateOne(
          { _id: currentOpenTrade._id },
          { $set: updateData }
        );

        // await StrategyTransactionModel.create({
        //   strategy_id: strategy._id,
        //   profit_loss: profitLoss,
        // });
        const cBal = await StrategyModel.findOne({
          _id: strategy._id,
          deleted_at: null,
        });
        await StrategyModel.updateOne(
          { _id: strategy._id },
          {
            $set: { current_balance: cBal.current_balance + profitLoss },
          }
        );

        const updatedStrategyData = await StrategyModel.findOne({
          _id: strategy._id,
          deleted_at: null,
        });
        await createNewStrategyTrade(updatedStrategyData, price, action);
        return { status: true, message: STATUS_MESSAGES.SUCCESS };
      } else {
        if (!strategy || (strategy && Number(strategy.current_balance) <= 0)) {
          return { status: false, message: STATUS_MESSAGES.LOW_BALANCE };
        }

        let lotSize = Math.floor(strategy.current_balance / price);
        if (Number(lotSize) <= 0) {
          return { status: false, message: STATUS_MESSAGES.LOW_BALANCE };
        }
        /* Create new trade and send notification */
        await createNewStrategyTrade(strategy, price, action);
        return { status: true, message: STATUS_MESSAGES.SUCCESS };
      }
    }
  } else {
    // If inverse is false
    if (strategy.pyramiding) {
      //If pyramiding is true and inverse is false
      const tOpen = await StrategyTradesModel.find({
        strategy_id: strategy._id,
        status: "open",
        deleted_at: null,
      });
      if (tOpen.length) {
        // Already active trades are there
        const lastOpen = tOpen[tOpen.length - 1];
        if (lastOpen.action !== action) {
          // In case of different direction order comes
          for (let k = 0; k < tOpen.length; k++) {
            const data = tOpen[k];
            let pl = 0;
            let updatedData;
            if (data.action === "sell" && action === "buy") {
              pl = (data.close_price - price) * data.lot_size;
              updatedData = {
                status: "closed",
                open_price: price,
                open_time: new Date(),
                profit_loss: pl,
              };
            } else if (data.action === "buy" && action === "sell") {
              pl = (price - data.open_price) * data.lot_size;
              updatedData = {
                status: "closed",
                close_price: price,
                close_time: new Date(),
                profit_loss: pl,
              };
            }
            await StrategyTradesModel.updateOne(
              { _id: data._id },
              { $set: updatedData }
            );
            // await StrategyTransactionModel.create({
            //   strategy_id: matchedStrategy._id,
            //   profit_loss: pl,
            // });
            const cBala = await StrategyModel.findOne({
              _id: strategy._id,
              deleted_at: null,
            });
            await StrategyModel.updateOne(
              { _id: strategy._id },
              { $set: { current_balance: cBala.current_balance + pl } }
            );
          }
          return { status: true, message: STATUS_MESSAGES.SUCCESS };
        } else {
          // In case of same direction order when pyramiding true and inverse false
          if (Number(strategy.current_balance) <= 0) {
            return { status: false, message: STATUS_MESSAGES.LOW_BALANCE };
          }
          let bal =
            (strategy.current_balance * strategy.pyramiding_stack) / 100;
          let remaining_balance = await openTradeConsumedBalance(
            tOpen,
            strategy
          );
          // console.log(remaining_balance);
          if (
            Number(strategy.pyramiding_stack) <= 0 ||
            bal <= 0 ||
            remaining_balance < bal
          ) {
            return {
              status: false,
              message: STATUS_MESSAGES.INVALID_PYRAMIDING_STACK,
            };
          }
          if (Number(Math.floor(bal / price)) <= 0) {
            return { status: false, message: STATUS_MESSAGES.LOW_BALANCE };
          }
          await createStrategyPyramidTrade(strategy, price, action);
          return { status: true, message: STATUS_MESSAGES.SUCCESS };
        }
      } else {
        //No open trade in pyramiding true and inverse false
        if (Number(strategy.current_balance) <= 0) {
          return { status: false, message: STATUS_MESSAGES.LOW_BALANCE };
        }
        let bal = (strategy.current_balance * strategy.pyramiding_stack) / 100;
        if (Number(strategy.pyramiding_stack) <= 0 || bal <= 0) {
          return {
            status: false,
            message: STATUS_MESSAGES.INVALID_PYRAMIDING_STACK,
          };
        }
        if (Number(Math.floor(bal / price)) <= 0) {
          return { status: false, message: STATUS_MESSAGES.LOW_BALANCE };
        }
        await createStrategyPyramidTrade(strategy, price, action);
        return { status: true, message: STATUS_MESSAGES.SUCCESS };
      }
    } else {
      const currentOpenTrade = await StrategyTradesModel.findOne({
        strategy_id: strategy._id,
        status: "open",
        deleted_at: null,
      });
      if (currentOpenTrade) {
        if (currentOpenTrade.action === action) {
          return {
            status: false,
            message: STATUS_MESSAGES.CANT_MAKE_SAME_DIRECTION_ORDER,
          };
        }

        let pL = 0;
        let uData;
        if (currentOpenTrade.action === "sell") {
          pL =
            (currentOpenTrade.close_price - price) * currentOpenTrade.lot_size;
          uData = {
            status: "closed",
            open_price: price,
            open_time: new Date(),
            profit_loss: pL,
          };
        } else {
          pL =
            (price - currentOpenTrade.open_price) * currentOpenTrade.lot_size;
          uData = {
            status: "closed",
            close_price: price,
            close_time: new Date(),
            profit_loss: pL,
          };
        }

        await StrategyTradesModel.updateOne(
          { _id: currentOpenTrade._id },
          { $set: uData }
        );

        // await StrategyTransactionModel.create({
        //   strategy_id: strategy._id,
        //   profit_loss: pL,
        // });
        const cBal = await StrategyModel.findOne({
          _id: strategy._id,
          deleted_at: null,
        });
        await StrategyModel.updateOne(
          { _id: strategy._id },
          { $set: { current_balance: cBal.current_balance + pL } }
        );
        return { status: true, message: STATUS_MESSAGES.SUCCESS };
      } else {
        const bal = parseFloat(strategy.current_balance);
        if (Number(bal) <= 0) {
          return { status: false, message: STATUS_MESSAGES.LOW_BALANCE };
        }
        let lot = Math.floor(bal / price);
        if (Number(lot) <= 0) {
          return { status: false, message: STATUS_MESSAGES.LOW_BALANCE };
        }
        await createNewStrategyTrade(strategy, price, action);
        return { status: true, message: STATUS_MESSAGES.SUCCESS };
      }
    }
  }
};

const openTradeConsumedBalance = async (trades, strategy) => {
  let consumed_balance = 0;
  trades.map((td) => {
    if (td.action === "buy") {
      consumed_balance = consumed_balance + td.lot_size * td.open_price;
    } else {
      consumed_balance = consumed_balance + td.lot_size * td.close_price;
    }
  });
  return strategy.current_balance - consumed_balance;
};

const webhook = async (req, res) => {
  try {
    const { strategy_id, secret_key, action, price } = req.body;
    //if any field is missing
    if (!strategy_id || !secret_key || !action || !price) {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.WEBHOOK_FIELD_MISSING
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }
    // Match strategy_id and secret_key with the StrategyModel
    const matchedStrategy = await StrategyModel.findOne({
      strategy_id: strategy_id,
      secret_key: secret_key,
      deleted_at: null,
    });

    if (!matchedStrategy) {
      const response = getCommonErrorResponse(
        STATUS_CODES.UNAUTHORIZED,
        null,
        STATUS_MESSAGES.WEBHOOK_STRATEGY_NOT_FOUND
      );
      return res.status(STATUS_CODES.UNAUTHORIZED).json(response);
    }
    const followData = await FollowModel.find({
      strategy_id: matchedStrategy._id,
      deleted_at: null,
    });

    const createTrades = await createStrategyTrades(
      matchedStrategy,
      price,
      action
    );

    if (createTrades && !createTrades.status && followData.length === 0) {
      const response = getCommonSuccessResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        createTrades.message
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    let hasError = false;
    // Iterate through each user_id
    for (let key = 0; key < followData.length; key++) {
      if (hasError) {
        break;
      }
      const userFollowData = followData[key];
      // If inverse is true, close the current trade and reopen it
      if (matchedStrategy.inverse) {
        if (matchedStrategy.pyramiding) {
          const cOpen = await TradesModel.find({
            strategy_id: matchedStrategy._id,
            user_id: userFollowData.user_id,
            status: "open",
            deleted_at: null,
          });
          if (cOpen.length) {
            // Already active trades are there
            const lastOpenTrade = cOpen[cOpen.length - 1];
            if (lastOpenTrade.action !== action) {
              // In case of different direction order comes
              for (let k = 0; k < cOpen.length; k++) {
                const m = cOpen[k];
                var PL = 0;
                var upData;
                if (m.action === "sell" && action === "buy") {
                  PL = (m.close_price - price) * m.lot_size;
                  upData = {
                    status: "closed",
                    open_price: price,
                    open_time: new Date(),
                    profit_loss: PL,
                  };
                } else if (m.action === "buy" && action === "sell") {
                  PL = (price - m.open_price) * m.lot_size;
                  upData = {
                    status: "closed",
                    close_price: price,
                    close_time: new Date(),
                    profit_loss: PL,
                  };
                }
                await TradesModel.updateOne({ _id: m._id }, { $set: upData });
              }
              const sData = await StrategyModel.findOne({
                _id: matchedStrategy._id,
                deleted_at: null,
              });
              await createPyramidTrade(sData, userFollowData, price, action);
            } else {
              // In case of same direction order
              const strategy = await StrategyModel.findOne({
                _id: matchedStrategy._id,
                deleted_at: null,
              });
              if (Number(strategy.current_balance) <= 0) {
                hasError = true;
                const response = getCommonSuccessResponse(
                  STATUS_CODES.BAD_REQUEST,
                  null,
                  STATUS_MESSAGES.LOW_BALANCE
                );
                return res.status(STATUS_CODES.BAD_REQUEST).json(response);
              }
              let bal =
                (strategy.current_balance * strategy.pyramiding_stack) / 100;
              let remaining_balance = openTradeConsumedBalance(cOpen, strategy);
              if (
                Number(strategy.pyramiding_stack) <= 0 ||
                bal <= 0 ||
                remaining_balance < bal
              ) {
                hasError = true;
                const response = getCommonSuccessResponse(
                  STATUS_CODES.BAD_REQUEST,
                  null,
                  STATUS_MESSAGES.INVALID_PYRAMIDING_STACK
                );
                return res.status(STATUS_CODES.BAD_REQUEST).json(response);
              }
              if (Number(Math.floor(bal / price)) <= 0) {
                hasError = true;
                const response = getCommonSuccessResponse(
                  STATUS_CODES.BAD_REQUEST,
                  null,
                  STATUS_MESSAGES.LOW_BALANCE
                );
                return res.status(STATUS_CODES.BAD_REQUEST).json(response);
              }
              await createPyramidTrade(strategy, userFollowData, price, action);
            }
          } else {
            //No open trade in pyramiding
            const stData = await StrategyModel.findOne({
              _id: matchedStrategy._id,
              deleted_at: null,
            });
            if (Number(stData.current_balance) <= 0) {
              hasError = true;
              const response = getCommonSuccessResponse(
                STATUS_CODES.BAD_REQUEST,
                null,
                STATUS_MESSAGES.LOW_BALANCE
              );
              return res.status(STATUS_CODES.BAD_REQUEST).json(response);
            }
            let bal = (stData.current_balance * stData.pyramiding_stack) / 100;
            if (Number(stData.pyramiding_stack) <= 0 || bal <= 0) {
              hasError = true;
              const response = getCommonSuccessResponse(
                STATUS_CODES.BAD_REQUEST,
                null,
                STATUS_MESSAGES.INVALID_PYRAMIDING_STACK
              );
              return res.status(STATUS_CODES.BAD_REQUEST).json(response);
            }
            if (Number(Math.floor(bal / price)) <= 0) {
              hasError = true;
              const response = getCommonSuccessResponse(
                STATUS_CODES.BAD_REQUEST,
                null,
                STATUS_MESSAGES.LOW_BALANCE
              );
              return res.status(STATUS_CODES.BAD_REQUEST).json(response);
            }
            await createPyramidTrade(stData, userFollowData, price, action);
          }
        } else {
          const currentTrade = await TradesModel.findOne({
            strategy_id: matchedStrategy._id,
            user_id: userFollowData.user_id,
            status: "open",
            deleted_at: null,
          });
          if (currentTrade) {
            // Calculate profit_loss
            var profitLoss = 0;
            var updateData;
            if (currentTrade.action === "sell") {
              profitLoss =
                (currentTrade.close_price - price) * currentTrade.lot_size;
              updateData = {
                status: "closed",
                open_price: price,
                open_time: new Date(),
                profit_loss: profitLoss,
              };
            } else {
              profitLoss =
                (price - currentTrade.open_price) * currentTrade.lot_size;
              updateData = {
                status: "closed",
                close_price: price,
                close_time: new Date(),
                profit_loss: profitLoss,
              };
            }

            await TradesModel.updateOne(
              { _id: currentTrade._id },
              { $set: updateData }
            );

            const updatedStrategyData = await StrategyModel.findOne({
              _id: matchedStrategy._id,
              deleted_at: null,
            });
            await createNewTrade(
              updatedStrategyData,
              userFollowData,
              price,
              action
            );
          } else {
            const sData = await StrategyModel.findOne({
              _id: matchedStrategy._id,
              deleted_at: null,
            });
            if (!sData || (sData && Number(sData.current_balance) <= 0)) {
              hasError = true;
              const response = getCommonSuccessResponse(
                STATUS_CODES.BAD_REQUEST,
                null,
                STATUS_MESSAGES.LOW_BALANCE
              );
              return res.status(STATUS_CODES.BAD_REQUEST).json(response);
            }
            let lotSize = Math.floor(sData.current_balance / price);
            if (Number(lotSize) <= 0) {
              hasError = true;
              const response = getCommonSuccessResponse(
                STATUS_CODES.BAD_REQUEST,
                null,
                STATUS_MESSAGES.LOW_BALANCE
              );
              return res.status(STATUS_CODES.BAD_REQUEST).json(response);
            }
            /* Create new trade and send notification */
            await createNewTrade(sData, userFollowData, price, action);
          }
        }
      } else {
        // If inverse is false
        if (matchedStrategy.pyramiding) {
          //If pyramiding is true and inverse is false
          const cOpen = await TradesModel.find({
            strategy_id: matchedStrategy._id,
            user_id: userFollowData.user_id,
            status: "open",
            deleted_at: null,
          });
          if (cOpen.length) {
            // Already active trades are there
            const lastOpen = cOpen[cOpen.length - 1];
            if (lastOpen.action !== action) {
              // In case of different direction order comes
              for (let k = 0; k < cOpen.length; k++) {
                const data = cOpen[k];
                let pl = 0;
                let updatedData;
                if (data.action === "sell" && action === "buy") {
                  pl = (data.close_price - price) * data.lot_size;
                  updatedData = {
                    status: "closed",
                    open_price: price,
                    open_time: new Date(),
                    profit_loss: pl,
                  };
                } else if (data.action === "buy" && action === "sell") {
                  pl = (price - data.open_price) * data.lot_size;
                  updatedData = {
                    status: "closed",
                    close_price: price,
                    close_time: new Date(),
                    profit_loss: pl,
                  };
                }
                await TradesModel.updateOne(
                  { _id: data._id },
                  { $set: updatedData }
                );
              }
            } else {
              // In case of same direction order when pyramiding true and inverse false
              const strt = await StrategyModel.findOne({
                _id: matchedStrategy._id,
                deleted_at: null,
              });
              if (Number(strt.current_balance) <= 0) {
                hasError = true;
                const response = getCommonSuccessResponse(
                  STATUS_CODES.BAD_REQUEST,
                  null,
                  STATUS_MESSAGES.LOW_BALANCE
                );
                return res.status(STATUS_CODES.BAD_REQUEST).json(response);
              }
              let bal = (strt.current_balance * strt.pyramiding_stack) / 100;
              let remaining_balance = openTradeConsumedBalance(cOpen, strt);
              if (
                Number(strt.pyramiding_stack) <= 0 ||
                bal <= 0 ||
                remaining_balance < bal
              ) {
                hasError = true;
                const response = getCommonSuccessResponse(
                  STATUS_CODES.BAD_REQUEST,
                  null,
                  STATUS_MESSAGES.INVALID_PYRAMIDING_STACK
                );
                return res.status(STATUS_CODES.BAD_REQUEST).json(response);
              }
              if (Number(Math.floor(bal / price)) <= 0) {
                hasError = true;
                const response = getCommonSuccessResponse(
                  STATUS_CODES.BAD_REQUEST,
                  null,
                  STATUS_MESSAGES.LOW_BALANCE
                );
                return res.status(STATUS_CODES.BAD_REQUEST).json(response);
              }
              await createPyramidTrade(strt, userFollowData, price, action);
            }
          } else {
            //No open trade in pyramiding true and inverse false
            const strData = await StrategyModel.findOne({
              _id: matchedStrategy._id,
              deleted_at: null,
            });
            if (Number(strData.current_balance) <= 0) {
              hasError = true;
              const response = getCommonSuccessResponse(
                STATUS_CODES.BAD_REQUEST,
                null,
                STATUS_MESSAGES.LOW_BALANCE
              );
              return res.status(STATUS_CODES.BAD_REQUEST).json(response);
            }
            let bal =
              (strData.current_balance * strData.pyramiding_stack) / 100;
            if (Number(strData.pyramiding_stack) <= 0 || bal <= 0) {
              hasError = true;
              const response = getCommonSuccessResponse(
                STATUS_CODES.BAD_REQUEST,
                null,
                STATUS_MESSAGES.INVALID_PYRAMIDING_STACK
              );
              return res.status(STATUS_CODES.BAD_REQUEST).json(response);
            }
            if (Number(Math.floor(bal / price)) <= 0) {
              hasError = true;
              const response = getCommonSuccessResponse(
                STATUS_CODES.BAD_REQUEST,
                null,
                STATUS_MESSAGES.LOW_BALANCE
              );
              return res.status(STATUS_CODES.BAD_REQUEST).json(response);
            }
            await createPyramidTrade(strData, userFollowData, price, action);
          }
        } else {
          const currentOpen = await TradesModel.findOne({
            strategy_id: matchedStrategy._id,
            user_id: userFollowData.user_id,
            status: "open",
            deleted_at: null,
          });
          if (currentOpen) {
            if (currentOpen.action === action) {
              hasError = true;
              const response = getCommonSuccessResponse(
                STATUS_CODES.BAD_REQUEST,
                null,
                STATUS_MESSAGES.CANT_MAKE_SAME_DIRECTION_ORDER
              );
              return res.status(STATUS_CODES.BAD_REQUEST).json(response);
            }
            let pL = 0;
            let uData;
            if (currentOpen.action === "sell") {
              pL = (currentOpen.close_price - price) * currentOpen.lot_size;
              uData = {
                status: "closed",
                open_price: price,
                open_time: new Date(),
                profit_loss: pL,
              };
            } else {
              pL = (price - currentOpen.open_price) * currentOpen.lot_size;
              uData = {
                status: "closed",
                close_price: price,
                close_time: new Date(),
                profit_loss: pL,
              };
            }

            await TradesModel.updateOne(
              { _id: currentOpen._id },
              { $set: uData }
            );
            await createNotification(
              matchedStrategy,
              userFollowData,
              price,
              action
            );
          } else {
            const balance = parseFloat(matchedStrategy.current_balance);
            if (Number(balance) <= 0) {
              hasError = true;
              const response = getCommonSuccessResponse(
                STATUS_CODES.BAD_REQUEST,
                null,
                STATUS_MESSAGES.LOW_BALANCE
              );
              return res.status(STATUS_CODES.BAD_REQUEST).json(response);
            }
            let lot = Math.floor(balance / price);
            if (Number(lot) <= 0) {
              hasError = true;
              const response = getCommonSuccessResponse(
                STATUS_CODES.BAD_REQUEST,
                null,
                STATUS_MESSAGES.LOW_BALANCE
              );
              return res.status(STATUS_CODES.BAD_REQUEST).json(response);
            }

            await createNewTrade(
              matchedStrategy,
              userFollowData,
              price,
              action
            );
          }
        }
      }
    }

    if (!hasError) {
      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        null,
        STATUS_MESSAGES.WEBHOOK_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    }
  } catch (error) {
    console.log("Error while processing webhook request:", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = { webhook };
