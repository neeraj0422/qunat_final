const {
  STATUS_CODES,
  STATUS_MESSAGES,
  PAGINATION,
} = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { MarketModel, AssetsModel } = require("../../../models");
const { transformedAssetsData } = require("../../../utils/TransformData");

const allAssetsBasedOnMarket = async (req, res) => {
  try {
    const { id, limit, page } = req.body;

    // Set default values
    const pageLimit = parseInt(limit) || PAGINATION.DEFAULT_LIMIT; // Default limit to 10 items per page
    let currentPage = parseInt(page) || PAGINATION.DEFAULT_PAGE; // Default to the first page

    //Find Market
    const market = await MarketModel.findOne({
      _id: id,
      deleted_at: null,
    }).sort({
      createdAt: -1,
    });

    if (!market) {
      // If the market does not exist, generate an error response
      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        null,
        STATUS_MESSAGES.MARKET_DATA_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    }

    //Find all related assets using the market_id
    const assetsForMarket = await AssetsModel.find({
      market_id: market._id,
      deleted_at: null,
    }).sort({ createdAt: -1 });

    // Fetch total number of assets
    const totalAssets = assetsForMarket.length;

    // Calculate the skip value based on the current page and limit
    const skip = (currentPage - 1) * pageLimit;

    // Apply pagination to assetsForMarket
    const paginatedAssets = assetsForMarket.slice(skip, skip + pageLimit);

    //Transform the assets data using the transformation function
    // const transformedAssets = paginatedAssets.map(transformedAssetsData);
    const transformedAssets = paginatedAssets.map((asset) => {
      const asset_image_url = `${process.env.SERVER_URL}/uploads/${asset.asset_image_url}`;
      return { ...transformedAssetsData(asset), asset_image_url };
    });

    const response = {
      data: transformedAssets,
      meta: {
        code: 1,
        status: STATUS_CODES.SUCCESS,
        message: STATUS_MESSAGES.ASSET_DATA_SUCCESS,
        limit,
        page,
        total: totalAssets,
      },
    };

    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log(
      "Error occured while getting assets details for requested market:",
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

module.exports = { allAssetsBasedOnMarket };
