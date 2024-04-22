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
const MarketModel = require("../../../models/MarketModel");
const {
  transformMarketData,
  transformedAssetsWithLimitedFields,
} = require("../../../utils/TransformData");
const { AssetsModel, StrategyModel } = require("../../../models");

const getSingleMarketData = async (req, res) => {
  try {
    const id = req.params.id;

    //check market is exist or not
    const existingMarket = await MarketModel.findOne({
      _id: id,
      deleted_at: null,
    });

    if (existingMarket) {
      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        existingMarket,
        STATUS_MESSAGES.MARKET_DATA_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    } else {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.MARKET_DATA_NOT_FOUND
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }
  } catch (error) {
    console.log("error occured while fetching single market data" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const addUpdateMarket = async (req, res) => {
  try {
    const { id, market_name } = req.validatedData;

    // If id is provided but empty, return an error
    if (id !== undefined && id.trim() === "") {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.INVALID_ID
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    //if id exist then update market else add new market
    if (id) {
      // Check if the market_name is already exist or not (case-insensitive)
      const marketNameExist = await MarketModel.findOne({
        _id: { $ne: id },
        market_name: { $regex: new RegExp("^" + market_name + "$", "i") },
        deleted_at: null,
      });

      if (marketNameExist) {
        const response = getCommonErrorResponse(
          STATUS_CODES.BAD_REQUEST,
          null,
          STATUS_MESSAGES.MARKET_NAME_EXIST
        );
        return res.status(STATUS_CODES.BAD_REQUEST).json(response);
      }

      // Find the market based on user_id
      const market = await MarketModel.findOne({ _id: id, deleted_at: null });

      // Check if the market exists
      if (!market) {
        const response = getCommonErrorResponse(
          STATUS_CODES.BAD_REQUEST,
          null,
          STATUS_MESSAGES.MARKET_DATA_NOT_FOUND
        );
        return res.status(STATUS_CODES.BAD_REQUEST).json(response);
      }

      // Update the market profile fields
      market.market_name = market_name;

      // Save the updated market
      await market.save();

      const updatedMarketData = {
        market_name: market.market_name,
      };

      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        updatedMarketData,
        STATUS_MESSAGES.MARKET_UPDATE_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    } else {
      // Check if the market_name is already exist or not (case-insensitive)
      const marketNameExist = await MarketModel.findOne({
        market_name: { $regex: new RegExp("^" + market_name + "$", "i") },
        deleted_at: null,
      });

      if (marketNameExist) {
        const response = getCommonErrorResponse(
          STATUS_CODES.BAD_REQUEST,
          null,
          STATUS_MESSAGES.MARKET_NAME_EXIST
        );
        return res.status(STATUS_CODES.BAD_REQUEST).json(response);
      }

      // Create a new market
      const newMarket = new MarketModel({
        market_name,
      });

      // Save the new user to the database
      await newMarket.save();

      const newMarketInfo = {
        first_name: newMarket.market_name,
      };

      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        newMarketInfo,
        STATUS_MESSAGES.MARKET_ADD_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    }
  } catch (error) {
    console.log("error occured while Adding or Updating market data" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const allMarketsDataWithPagination = async (req, res) => {
  try {
    const { limit, page } = req.body;

    // Set default values
    const pageLimit = parseInt(limit) || PAGINATION.DEFAULT_LIMIT; // Default limit to 10 items per page
    let currentPage = parseInt(page) || PAGINATION.DEFAULT_PAGE; // Default to the first page

    // Fetch total number of markets
    const totalMarkets = await MarketModel.countDocuments({ deleted_at: null });

    // Calculate the skip value based on the current page and limit
    const skip = (currentPage - 1) * pageLimit;

    // Fetch markets with pagination from the database
    const markets = await MarketModel.find({ deleted_at: null })
      .skip(skip)
      .limit(pageLimit);

    // Transform the markets using the transformer function
    const transformedMarkets = markets.map(transformMarketData);

    return res.status(STATUS_CODES.SUCCESS).json({
      data: transformedMarkets,
      meta: {
        code: 1,
        status: STATUS_CODES.SUCCESS,
        message: STATUS_MESSAGES.MARKET_DATA_SUCCESS,
        limit: pageLimit,
        page: currentPage,
        total: totalMarkets,
      },
    });
  } catch (error) {
    console.log("error occured while fetching market data" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const allMarketsData = async (req, res) => {
  try {
    // find all markets data
    const markets = await MarketModel.find({ deleted_at: null }).sort({
      createdAt: -1,
    });

    // Transform the markets using the transformer function
    const transformedMarkets = markets.map(transformMarketData);

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      transformedMarkets,
      STATUS_MESSAGES.MARKET_DATA_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("error occured while fetching all market data" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const deleteSingleMarket = async (req, res) => {
  try {
    const id = req.params.id;

    //check market is exist or not
    const market = await MarketModel.findOne({
      _id: id,
      deleted_at: null,
    });

    if (market) {
      // If condition is truthy, it means a document is exist
      // Find and soft delete associated assets
      const assetsToDelete = await AssetsModel.find({
        market_id: market._id,
        deleted_at: null,
      });
      for (const asset of assetsToDelete) {
        await asset.softAssetDelete();
      }

      // Find and soft delete associated strategies
      const strategiesToDelete = await StrategyModel.find({
        market_id: market._id,
        deleted_at: null,
      });
      for (const strategy of strategiesToDelete) {
        await strategy.softStrategyDelete();
      }

      await market.softMarketDelete();

      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        null,
        STATUS_MESSAGES.MARKET_DELETE_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    } else {
      // If deletionResult is falsy, it means the document with the specified ID wasn't found
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.MARKET_DATA_NOT_FOUND
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }
  } catch (error) {
    console.log("error occured while deleting market data" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const getAssetsBasedOnMarket = async (req, res) => {
  try {
    const marketId = req.params.id;

    // Check if the market exists
    const assets = await AssetsModel.find({
      market_id: marketId,
      deleted_at: null,
    });

    if (!assets) {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.ASSET_DATA_NOT_FOUND
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    const transformedAssetsWithLimitedFieldsData = assets.map(
      transformedAssetsWithLimitedFields
    );

    // If assets were found, return them in the response
    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      transformedAssetsWithLimitedFieldsData,
      STATUS_MESSAGES.ASSET_DATA_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("error occured while accessing assets based on market" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = {
  getSingleMarketData,
  addUpdateMarket,
  allMarketsDataWithPagination,
  allMarketsData,
  deleteSingleMarket,
  getAssetsBasedOnMarket,
};
