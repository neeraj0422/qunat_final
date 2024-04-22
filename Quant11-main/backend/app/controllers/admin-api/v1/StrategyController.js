const mongoose = require("mongoose");
const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const StrategyModel = require("../../../models/StrategyModel");
const {
  transformedAdminStrategyData,
} = require("../../../utils/TransformData");
const {
  generateUniqueStrategySecretKey,
  generateUniqueStrategyId,
} = require("../../../utils/generateRandomString");
const {
  FollowModel,
  NotificationModel,
  StrategyTransactionModel,
  TradesModel,
} = require("../../../models");

const getSingleStrategyData = async (req, res) => {
  try {
    const id = req.params.id;

    //check Strategy is exist or not
    const existingStrategy = await StrategyModel.findOne({
      _id: id,
      deleted_at: null,
    }).populate(["market_id", "asset_id"]);

    if (existingStrategy) {
      // Transform the asset data using the transformer function
      const transformedStrategy =
        transformedAdminStrategyData(existingStrategy);

      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        transformedStrategy,
        STATUS_MESSAGES.STRATEGY_DATA_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    } else {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.STRATEGY_DATA_NOT_FOUND
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }
  } catch (error) {
    console.log("error occured while fetching single strategy data" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const addUpdateStrategy = async (req, res) => {
  try {
    const {
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
    } = req.body;

    if (!stop_loss) {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.STRATEGY_FIELD_MISSING
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    var pyramiding_stack = 0;
    if (pyramiding && req.body.pyramiding_stack) {
      pyramiding_stack = req.body.pyramiding_stack;
    } else if (pyramiding && !req.body.pyramiding_stack) {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.PYRAMIDING_STACK_REQUIRED
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }
    // If id is provided but empty, return an error
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

      const newStrategyData = await StrategyModel.findOne({
        _id: newStrategy._id,
        deleted_at: null,
      }).populate(["market_id", "asset_id"]);

      // Transform the asset data using the transformer function
      const transformedStrategy = transformedAdminStrategyData(newStrategyData);

      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        transformedStrategy,
        STATUS_MESSAGES.STRATEGY_ADD_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    }
  } catch (error) {
    console.log("error occured while Adding or Updating strategy data" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const deleteSingleStrategy = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.INVALID_ID
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    //check assets is exist or not
    const strategy = await StrategyModel.findOne({
      _id: id,
      deleted_at: null,
    });

    if (strategy) {
      // If condition is truthy, it means a document was deleted successfully

      // Find and soft delete associated follows data
      const followsToDelete = await FollowModel.find({
        strategy_id: strategy._id,
        deleted_at: null,
      });
      for (const follow of followsToDelete) {
        await follow.softFollowDelete();
      }

      // Find and soft delete associated notification data
      const notificationToDelete = await NotificationModel.find({
        strategy_id: strategy._id,
        deleted_at: null,
      });
      for (const notification of notificationToDelete) {
        await notification.softNotificationDelete();
      }

      // Find and soft delete associated strategy transactions data
      const strategyTransactionsToDelete = await StrategyTransactionModel.find({
        strategy_id: strategy._id,
        deleted_at: null,
      });
      for (const transaction of strategyTransactionsToDelete) {
        await transaction.softStrategyTransactionDelete();
      }

      // Find and soft delete associated trade data
      const tradesToDelete = await TradesModel.find({
        strategy_id: strategy._id,
        deleted_at: null,
      });
      for (const trade of tradesToDelete) {
        await trade.softTradeDelete();
      }

      await strategy.softStrategyDelete();

      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        null,
        STATUS_MESSAGES.STRATEGY_DELETE_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    } else {
      // If deletionResult is falsy, it means the document with the specified ID wasn't found
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.STRATEGY_DATA_NOT_FOUND
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }
  } catch (error) {
    console.log("error occured while deleting strategy data" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const allStrategiesData = async (req, res) => {
  try {
    //find all strategies data
    const strategies = await StrategyModel.find({
      deleted_at: null,
    })
      .sort({ createdAt: -1 })
      .populate(["market_id", "asset_id"]);
    // Transform the strategies using the transformer function
    const transformedStrategy = strategies.map(transformedAdminStrategyData);

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      transformedStrategy,
      STATUS_MESSAGES.STRATEGY_DATA_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("error occured while fetching all strategies data" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const allStrategiesDataWithPagination = async (req, res) => {
  try {
    const { limit, page } = req.body;

    // Set default values
    const pageLimit = parseInt(limit) || PAGINATION.DEFAULT_LIMIT; // Default limit to 10 items per page
    let currentPage = parseInt(page) || PAGINATION.DEFAULT_PAGE; // Default to the first page

    // Fetch total number of strategies
    const totalStrategies = await StrategyModel.countDocuments({
      deleted_at: null,
    });

    // Calculate the skip value based on the current page and limit
    const skip = (currentPage - 1) * pageLimit;

    // Fetch strategies with pagination from the database
    const strategies = await StrategyModel.find({
      deleted_at: null,
    })
      .populate(["market_id", "asset_id"])
      .skip(skip)
      .limit(pageLimit);

    // Transform the strategies using the transformer function
    const transformedStrategy = strategies.map(transformedAdminStrategyData);

    return res.status(STATUS_CODES.SUCCESS).json({
      data: transformedStrategy,
      meta: {
        code: 1,
        status: STATUS_CODES.SUCCESS,
        message: STATUS_MESSAGES.ASSET_DATA_SUCCESS,
        limit: pageLimit,
        page: currentPage,
        total: totalStrategies,
      },
    });
  } catch (error) {
    console.log("error occured while fetching strategies data" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const regenerateStrategyData = async (req, res) => {
  try {
    const strategyId = req.params.id;

    const strategy = await StrategyModel.findOne({
      _id: strategyId,
      deleted_at: null,
    });

    if (!strategy) {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.STRATEGY_DATA_NOT_FOUND
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    let secret_key = await generateUniqueStrategySecretKey(StrategyModel);
    let strategy_id = await generateUniqueStrategyId(StrategyModel);

    strategy.secret_key = secret_key;
    strategy.strategy_id = strategy_id;

    // Save the updated market
    await strategy.save();

    const newStrategyData = await StrategyModel.findOne({
      _id: strategy._id,
      deleted_at: null,
    }).populate(["market_id", "asset_id"]);

    // Transform the asset data using the transformer function
    const transformedStrategy = transformedAdminStrategyData(newStrategyData);

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      transformedStrategy,
      STATUS_MESSAGES.STRATEGY_DATA_REGENERATE
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("error occurred while regenerating strategies data" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = {
  addUpdateStrategy,
  deleteSingleStrategy,
  getSingleStrategyData,
  allStrategiesData,
  allStrategiesDataWithPagination,
  regenerateStrategyData,
};
