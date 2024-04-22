const mongoose = require("mongoose");
const {
  STATUS_CODES,
  STATUS_MESSAGES,
  PAGINATION,
} = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { FollowModel, StrategyModel, AssetsModel } = require("../../../models");
const { transformedStrategyData } = require("../../../utils/TransformData");

const followStrategy = async (req, res) => {
  try {
    const { strategy_id } = req.body;
    const { user_id } = req.user;

    if (!strategy_id || !user_id) {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.FOLLOW_STRATEGY_FIELD_MISSING
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    // Check if the user has already followed the strategy
    const existingFollow = await FollowModel.findOne({
      strategy_id,
      user_id,
      deleted_at: null,
    });

    if (existingFollow) {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.ALREADY_FOLLOWING_STRATEGY
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    // Create and save a new object in FollowModel
    await FollowModel.create({
      strategy_id,
      user_id: mongoose.Types.ObjectId(user_id),
    });

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      null,
      STATUS_MESSAGES.FOLLOW_STRATEGY_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("Error occured while following strategy:", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const unFollowStrategy = async (req, res) => {
  try {
    const { strategy_id } = req.body;
    const { user_id } = req.user;

    if (!strategy_id || !user_id) {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.FOLLOW_STRATEGY_FIELD_MISSING
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    // Check if the user has already followed the strategy
    const existingFollow = await FollowModel.findOne({
      strategy_id,
      user_id,
      deleted_at: null,
    });

    if (!existingFollow) {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.STRATEGY_NOT_FOLLOWED
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    const strategy = await FollowModel.findOne({
      strategy_id,
      user_id,
      deleted_at: null,
    });

    await strategy.softFollowDelete();

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      null,
      STATUS_MESSAGES.UNFOLLOW_STRATEGY_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("Error occured while following strategy:", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const assetsWiseStrategies = async (req, res) => {
  try {
    const { id, limit, page } = req.body;

    const { user_id } = req.user;

    if (!id || !limit || !page) {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.STRATEGY_FIELD_MISSING
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    // Set default values
    const pageLimit = parseInt(limit) || PAGINATION.DEFAULT_LIMIT; // Default limit to 10 items per page
    let currentPage = parseInt(page) || PAGINATION.DEFAULT_PAGE; // Default to the first page

    // Fetch total number of strategies
    const totalStrategies = await StrategyModel.countDocuments({
      deleted_at: null,
    });

    // Calculate the skip value based on the current page and limit
    const skip = (currentPage - 1) * pageLimit;
    const asset = await AssetsModel.findOne({ _id: id, deleted_at: null });
    // Fetch strategies with pagination from the database
    const strategies = await StrategyModel.find({
      asset_id: id,
      deleted_at: null,
    })
      .populate(["market_id", "asset_id"])
      .skip(skip)
      .limit(pageLimit);

    if (!strategies) {
      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        null,
        STATUS_MESSAGES.STRATEGY_DATA_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    }

    const transformedData = await Promise.all(
      strategies.map(async (strategy) => {
        // Check if the user follows the strategy
        const follow = await FollowModel.findOne({
          strategy_id: strategy._id,
          user_id,
          deleted_at: null,
        });

        const is_followed = follow ? 1 : 0;

        // Transform the strategy data
        const transformedStrategy = transformedStrategyData(strategy);

        // Add is_followed to the transformed strategy data
        return { ...transformedStrategy, is_followed };
      })
    );

    return res.status(STATUS_CODES.SUCCESS).json({
      data: {
        asset_name: asset ? asset.asset_name : "",
        ticker_symbol: asset ? asset.ticker_symbol : "",
        values: transformedData,
      },
      meta: {
        code: 1,
        status: STATUS_CODES.SUCCESS,
        message: STATUS_MESSAGES.STRATEGY_DATA_SUCCESS,
        limit: pageLimit,
        page: currentPage,
        total: totalStrategies,
      },
    });
  } catch (error) {
    console.log(
      "Error occured while accessing strategies based on asset data:",
      error
    );
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const strategiesDetails = async (req, res) => {
  try {
    const { id } = req.validatedData;
    const { user_id } = req.user;

    const strategyDetails = await StrategyModel.findOne({
      _id: id,
      deleted_at: null,
    }).populate(["asset_id", "market_id"]);

    if (!strategyDetails) {
      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        null,
        STATUS_MESSAGES.STRATEGY_DATA_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    }

    const follow = await FollowModel.findOne({
      strategy_id: strategyDetails._id,
      user_id,
      deleted_at: null,
    });

    const is_followed = follow ? 1 : 0;

    const transformedData = transformedStrategyData(strategyDetails);

    return res.status(STATUS_CODES.SUCCESS).json({
      data: transformedData,
      meta: {
        code: 1,
        status: STATUS_CODES.SUCCESS,
        message: STATUS_MESSAGES.STRATEGY_DATA_SUCCESS,
        is_followed,
      },
    });
  } catch (error) {
    console.log("Error occured while accessing strategy details:", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = {
  followStrategy,
  assetsWiseStrategies,
  strategiesDetails,
  unFollowStrategy,
};
