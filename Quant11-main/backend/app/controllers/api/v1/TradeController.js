const {
  STATUS_CODES,
  STATUS_MESSAGES,
  PAGINATION,
} = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { StrategyTradesModel } = require("../../../models");
const {
  transformedOpenTrade,
  transformedCloseTrade,
} = require("../../../utils/TransformData");

const openTrades = async (req, res) => {
  try {
    const { strategy_id, limit, page } = req.validatedData;
    // const { user_id } = req.user;

    // Set default values
    const pageLimit = parseInt(limit) || PAGINATION.DEFAULT_LIMIT; // Default limit to 10 items per page
    let currentPage = parseInt(page) || PAGINATION.DEFAULT_PAGE; // Default to the first page

    // Calculate the skip value based on the current page and limit
    const skip = (currentPage - 1) * pageLimit;

    // const openTradesData = await TradesModel.find({
    const openTradesData = await StrategyTradesModel.find({
      strategy_id,
      // user_id,
      status: "open",
      deleted_at: null,
    })
      .sort({ createdAt: -1 })
      .populate("asset_id")
      .skip(skip)
      .limit(pageLimit);
    if (!openTradesData) {
      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        null,
        STATUS_MESSAGES.OPEN_TRADE_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    }

    // Count of documents in openTradesData
    // const totalOpenTrades = await TradesModel.countDocuments({
    const totalOpenTrades = await StrategyTradesModel.countDocuments({
      strategy_id,
      // user_id,
      status: "open",
      deleted_at: null,
    });

    const transformedData = openTradesData.map(transformedOpenTrade);

    return res.status(STATUS_CODES.SUCCESS).json({
      data: transformedData,
      meta: {
        code: 1,
        status: STATUS_CODES.SUCCESS,
        message: STATUS_MESSAGES.OPEN_TRADE_SUCCESS,
        limit: pageLimit,
        page: currentPage,
        total: totalOpenTrades,
      },
    });
  } catch (error) {
    console.log("Error occured while accessing open trades:", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const closeTrades = async (req, res) => {
  try {
    const { strategy_id, limit, page } = req.validatedData;
    // const { user_id } = req.user;

    // Set default values
    const pageLimit = parseInt(limit) || PAGINATION.DEFAULT_LIMIT; // Default limit to 10 items per page
    let currentPage = parseInt(page) || PAGINATION.DEFAULT_PAGE; // Default to the first page

    // Calculate the skip value based on the current page and limit
    const skip = (currentPage - 1) * pageLimit;

    // const closeTradesData = await TradesModel.find({
    const closeTradesData = await StrategyTradesModel.find({
      strategy_id,
      // user_id,
      status: "closed",
      deleted_at: null,
    })
      .sort({ createdAt: -1 })
      .populate("asset_id")
      .skip(skip)
      .limit(pageLimit);

    if (!closeTradesData) {
      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        null,
        STATUS_MESSAGES.CLOSE_TRADE_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    }

    // Count of documents in closeTradesData
    const totalCloseTrades = await StrategyTradesModel.countDocuments({
      strategy_id,
      // user_id,
      status: "closed",
      deleted_at: null,
    });

    const transformedData = closeTradesData.map(transformedCloseTrade);

    return res.status(STATUS_CODES.SUCCESS).json({
      data: transformedData,
      meta: {
        code: 1,
        status: STATUS_CODES.SUCCESS,
        message: STATUS_MESSAGES.CLOSE_TRADE_SUCCESS,
        limit: pageLimit,
        page: currentPage,
        total: totalCloseTrades,
      },
    });
  } catch (error) {
    console.log("Error occured while accessing close trades:", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const closeTradeDataWithoutPagination = async (req, res) => {
  try {
    const { strategy_id } = req.body;

    // const closeTradesData = await TradesModel.find({
    const closeTradesData = await StrategyTradesModel.find({
      strategy_id,
      status: "closed",
      deleted_at: null,
    })
      .sort({ createdAt: -1 })
      .populate("asset_id");

    if (!closeTradesData) {
      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        null,
        STATUS_MESSAGES.CLOSE_TRADE_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    }

    const transformedData = closeTradesData.map(transformedCloseTrade);

    return res.status(STATUS_CODES.SUCCESS).json({
      data: transformedData,
      meta: {
        code: 1,
        status: STATUS_CODES.SUCCESS,
        message: STATUS_MESSAGES.CLOSE_TRADE_SUCCESS,
      },
    });
  } catch (error) {
    console.log("Error occured while accessing close trades:", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = { openTrades, closeTrades, closeTradeDataWithoutPagination };
