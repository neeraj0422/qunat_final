const formidable = require("formidable");
const mongoose = require("mongoose");
const { STATUS_CODES, STATUS_MESSAGES } = require("../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../config/responseHandler.config");
const StrategyModel = require("../models/StrategyModel");
const { transformedAdminStrategyData } = require("../utils/TransformData");
const {
  generateUniqueStrategySecretKey,
  generateUniqueStrategyId,
} = require("../utils/generateRandomString");
const fs = require("fs");
const { parse } = require("csv-parse");
const { StrategyTradesModel } = require("../models");
const moment = require("moment");

const mongoDbDateTime = (dateTime) => {
  const convertedDate = moment(
    String(dateTime),
    // "DD-MM-YYYY HH:mm:ss"
    "YYYY-MM-DD HH:mm:ss"
  ).format();
  return convertedDate;
};

const AddStrategyWithTradeData = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    const records = [];

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log("Error parsing form data:", err);
        return res.status(500).json({ error: "Error parsing form data" });
      }
      // Extract the details from the parsed form data
      let {
        id,
        strategy_name,
        asset_id,
        market_id,
        initial_balance,
        inverse,
        pyramiding,
        profit_factor,
        drawdown,
        profit_percentage,
        timeframe,
        currency,
        stop_loss,
      } = fields;

      id = Array.isArray(id) ? id[0] : id;
      strategy_name = Array.isArray(strategy_name)
        ? strategy_name[0]
        : strategy_name;
      asset_id = Array.isArray(asset_id) ? asset_id[0] : asset_id;
      market_id = Array.isArray(market_id) ? market_id[0] : market_id;
      initial_balance = Array.isArray(initial_balance)
        ? initial_balance[0]
        : initial_balance;
      inverse = Array.isArray(inverse) ? inverse[0] : inverse;
      pyramiding = Array.isArray(pyramiding) ? pyramiding[0] : pyramiding;
      profit_factor = Array.isArray(profit_factor)
        ? profit_factor[0]
        : profit_factor;
      drawdown = Array.isArray(drawdown) ? drawdown[0] : drawdown;
      profit_percentage = Array.isArray(profit_percentage)
        ? profit_percentage[0]
        : profit_percentage;
      timeframe = Array.isArray(timeframe) ? timeframe[0] : timeframe;
      currency = Array.isArray(currency) ? currency[0] : currency;
      stop_loss = Array.isArray(stop_loss) ? stop_loss[0] : stop_loss;

      if (!stop_loss) {
        const response = getCommonErrorResponse(
          STATUS_CODES.BAD_REQUEST,
          null,
          STATUS_MESSAGES.STRATEGY_FIELD_MISSING
        );
        return res.status(STATUS_CODES.BAD_REQUEST).json(response);
      }

      var pyramiding_stack = 0;
      if (Boolean(pyramiding) === true && req.body.pyramiding_stack) {
        pyramiding_stack = req.body.pyramiding_stack;
      } else if (Boolean(pyramiding) === true && !fields.pyramiding_stack) {
        const response = getCommonErrorResponse(
          STATUS_CODES.BAD_REQUEST,
          null,
          STATUS_MESSAGES.PYRAMIDING_STACK_REQUIRED
        );
        return res.status(STATUS_CODES.BAD_REQUEST).json(response);
      }
      //   If id is provided but empty, return an error
      if (id !== undefined && id.trim() === "") {
        const response = getCommonErrorResponse(
          STATUS_CODES.BAD_REQUEST,
          null,
          STATUS_MESSAGES.INVALID_ID
        );
        return res.status(STATUS_CODES.BAD_REQUEST).json(response);
      }

      //if id exist then update strategy else add new strategy
      if (id) {
        // Check if the market_name is already exist or not (case-insensitive)
        const strategyNameExist = await StrategyModel.findOne({
          _id: { $ne: id },
          strategy_name: { $regex: new RegExp("^" + strategy_name + "$", "i") },
          deleted_at: null,
        });

        if (strategyNameExist) {
          const response = getCommonErrorResponse(
            STATUS_CODES.BAD_REQUEST,
            null,
            STATUS_MESSAGES.STRATEGY_NAME_EXIST
          );
          return res.status(STATUS_CODES.BAD_REQUEST).json(response);
        }

        // Find the market based on user_id
        const strategy = await StrategyModel.findOne({
          _id: id,
          deleted_at: null,
        });

        // Check if the market exists
        if (!strategy) {
          const response = getCommonErrorResponse(
            STATUS_CODES.BAD_REQUEST,
            null,
            STATUS_MESSAGES.STRATEGY_DATA_NOT_FOUND
          );
          return res.status(STATUS_CODES.BAD_REQUEST).json(response);
        }

        // Update the market profile fields
        strategy.strategy_name = strategy_name
          ? strategy_name
          : strategy.strategy_name;
        strategy.asset_id = asset_id
          ? mongoose.Types.ObjectId(asset_id)
          : strategy.asset_id;
        strategy.market_id = market_id
          ? mongoose.Types.ObjectId(market_id)
          : strategy.market_id;
        strategy.initial_balance = initial_balance
          ? initial_balance
          : strategy.initial_balance;
        strategy.inverse = inverse !== undefined ? inverse : strategy.inverse;
        strategy.pyramiding =
          pyramiding !== undefined ? pyramiding : strategy.pyramiding;
        strategy.pyramiding_stack =
          pyramiding !== undefined && pyramiding_stack ? pyramiding_stack : 0;
        strategy.profit_factor = profit_factor
          ? profit_factor
          : strategy.profit_factor;
        strategy.drawdown = drawdown ? drawdown : strategy.drawdown;
        strategy.profit_percentage = profit_percentage
          ? profit_percentage
          : strategy.profit_percentage;
        strategy.timeframe = timeframe ? timeframe : strategy.timeframe;
        strategy.currency = currency ? currency : strategy.currency;
        strategy.stop_loss = stop_loss;

        // Save the updated market
        await strategy.save();

        const strategyData = await StrategyModel.findOne({
          _id: strategy._id,
          deleted_at: null,
        }).populate(["market_id", "asset_id"]);

        // Transform the asset data using the transformer function
        const transformedStrategy = transformedAdminStrategyData(strategyData);

        const response = getCommonSuccessResponse(
          STATUS_CODES.SUCCESS,
          transformedStrategy,
          STATUS_MESSAGES.STRATEGY_UPDATE_SUCCESS
        );
        return res.status(STATUS_CODES.SUCCESS).json(response);
      } else {
        if (
          !strategy_name ||
          !asset_id ||
          !market_id ||
          !initial_balance ||
          inverse === undefined ||
          pyramiding === undefined ||
          !profit_factor ||
          !drawdown ||
          !profit_percentage ||
          !timeframe ||
          !currency ||
          stop_loss === undefined ||
          !stop_loss
        ) {
          const response = getCommonErrorResponse(
            STATUS_CODES.BAD_REQUEST,
            null,
            STATUS_MESSAGES.STRATEGY_FIELD_MISSING
          );
          return res.status(STATUS_CODES.BAD_REQUEST).json(response);
        }

        // Check if the market_name is already exist or not (case-insensitive)
        const strategyNameExist = await StrategyModel.findOne({
          strategy_name: { $regex: new RegExp("^" + strategy_name + "$", "i") },
          //   deleted_at: null,
        });

        if (strategyNameExist) {
          const response = getCommonErrorResponse(
            STATUS_CODES.BAD_REQUEST,
            null,
            STATUS_MESSAGES.STRATEGY_NAME_EXIST
          );
          return res.status(STATUS_CODES.BAD_REQUEST).json(response);
        }

        let secret_key = await generateUniqueStrategySecretKey(StrategyModel);
        let strategy_id = await generateUniqueStrategyId(StrategyModel);

        // Create a new strategy
        const newStrategy = new StrategyModel({
          strategy_name,
          asset_id: mongoose.Types.ObjectId(asset_id),
          market_id: mongoose.Types.ObjectId(market_id),
          initial_balance,
          current_balance: initial_balance,
          inverse,
          pyramiding,
          profit_factor,
          drawdown,
          profit_percentage,
          timeframe,
          secret_key,
          strategy_id,
          pyramiding_stack: pyramiding_stack ? pyramiding_stack : 0,
          currency,
          stop_loss,
        });

        // Save the new user to the database
        await newStrategy.save();

        // Use the correct field name when accessing the file
        const trade_data_file =
          files && files.trade_data_file && files.trade_data_file[0];

        if (trade_data_file) {
          //also add trade data if it exist from csv file
          // Access the underlying file stream
          const fileStream = fs.createReadStream(trade_data_file.filepath); // Create a readable stream

          // Use the readable stream api to consume records
          const parser = parse({
            delimiter: ",",
            columns: true, // Assuming the first row contains headers
            skip_empty_lines: true,
          });

          // Handle data event to process each record
          parser.on("data", function (record) {
            records.push(record);
          });

          // Handle end event to signal the end of parsing
          parser.on("end", async function () {
            console.log("Parsing finished");

            if (records) {
              // Iterate through consecutive pairs of records in reverse order
              for (let i = records.length - 1; i >= 1; i--) {
                const currentRecord = records[i];
                const nextRecord = records[i - 1];
                const previousRecord = records[i + 1];

                // Check if 'Trade #' values match
                if (currentRecord["Trade #"] === nextRecord["Trade #"]) {
                  // Do something if 'Trade #' values match
                  if (
                    currentRecord["Type"] === "Entry Long" &&
                    nextRecord["Type"] === "Exit Long" &&
                    nextRecord["Signal"] !== "Open"
                  ) {
                    //   open trade
                    const newRecord = await StrategyTradesModel.create({
                      open_time: mongoDbDateTime(currentRecord["Date/Time"]),
                      strategy_id: newStrategy._id,
                      asset_id,
                      action: "buy",
                      open_price: currentRecord["Price USD"],
                      lot_size: currentRecord["Contracts"],
                      status: "open",
                    });

                    // Fetch the record from the database based on the ID (assuming you have an 'id' field)
                    const existingRecord = await StrategyTradesModel.findById(
                      newRecord._id
                    );

                    // close previous open trade
                    existingRecord.close_time = mongoDbDateTime(
                      nextRecord["Date/Time"]
                    );
                    existingRecord.close_price = nextRecord["Price USD"];
                    existingRecord.lot_size = nextRecord["Contracts"];
                    existingRecord.status = "closed";
                    existingRecord.profit_loss = nextRecord["Profit USD"];
                    //   Save the modified record back to the database
                    await existingRecord.save();
                  } else if (
                    currentRecord["Type"] === "Entry Short" &&
                    nextRecord["Type"] === "Exit Short" &&
                    nextRecord["Signal"] !== "Open"
                  ) {
                    //close trade
                    const newRecord = await StrategyTradesModel.create({
                      close_time: mongoDbDateTime(currentRecord["Date/Time"]),
                      strategy_id: newStrategy._id,
                      asset_id,
                      action: "sell",
                      close_price: currentRecord["Price USD"],
                      lot_size: currentRecord["Contracts"],
                      status: "open",
                      profit_loss: currentRecord["Profit USD"],
                    });

                    // Fetch the record from the database based on the ID (assuming you have an 'id' field)
                    const existingRecord = await StrategyTradesModel.findById(
                      newRecord._id
                    );

                    // close previous open trade
                    existingRecord.open_time = mongoDbDateTime(
                      nextRecord["Date/Time"]
                    );
                    existingRecord.open_price = nextRecord["Price USD"];
                    existingRecord.lot_size = nextRecord["Contracts"];
                    existingRecord.status = "closed";
                    existingRecord.profit_loss = nextRecord["Profit USD"];

                    //   Save the modified record back to the database
                    await existingRecord.save();
                  } else if (nextRecord["Signal"] === "Open") {
                    if (currentRecord["Type"] === "Entry Long") {
                      const newRecord = await StrategyTradesModel.create({
                        open_time: mongoDbDateTime(currentRecord["Date/Time"]),
                        strategy_id: newStrategy._id,
                        asset_id,
                        action: "buy",
                        open_price: currentRecord["Price USD"],
                        lot_size: previousRecord["Contracts"],
                        status: "open",
                      });

                      const modifiedStrategy = await StrategyModel.findOne({
                        _id: newStrategy._id,
                      });
                      modifiedStrategy.current_balance =
                        previousRecord["Cum. Profit USD"];
                      await modifiedStrategy.save();
                    } else {
                      await StrategyTradesModel.create({
                        close_time: mongoDbDateTime(currentRecord["Date/Time"]),
                        strategy_id: newStrategy._id,
                        asset_id,
                        action: "sell",
                        close_price: currentRecord["Price USD"],
                        lot_size: previousRecord["Contracts"],
                        status: "open",
                      });
                      const modifiedStrategy = await StrategyModel.findById(
                        newStrategy._id
                      );
                      modifiedStrategy.current_balance =
                        previousRecord["Cum. Profit USD"];
                      await modifiedStrategy.save();
                    }
                  }

                  // Break the loop if a match is found
                  // break;
                }
              }
            } else {
              console.log("Reacords not found");
            }
          });

          // Catch any error
          parser.on("error", function (parseErr) {
            console.error(parseErr.message);
            return res.status(500).json({ error: "Error parsing CSV data" });
          });

          // Handle file stream errors
          fileStream.on("error", function (fileErr) {
            console.error("File stream error:", fileErr.message);
            return res
              .status(500)
              .json({ error: "Error handling file stream" });
          });

          // Pipe the CSV file stream directly into the parser
          fileStream.pipe(parser);
        }

        const newStrategyData = await StrategyModel.findOne({
          _id: newStrategy._id,
          deleted_at: null,
        }).populate(["market_id", "asset_id"]);

        // Transform the asset data using the transformer function
        const transformedStrategy =
          transformedAdminStrategyData(newStrategyData);

        const response = getCommonSuccessResponse(
          STATUS_CODES.SUCCESS,
          transformedStrategy,
          STATUS_MESSAGES.STRATEGY_ADD_SUCCESS
        );
        return res.status(STATUS_CODES.SUCCESS).json(response);
      }
    });
  } catch (error) {
    console.log("Error occurred while processing Trade data file:", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = { AddStrategyWithTradeData };
