const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { MarketModel, AssetsModel } = require("../../../models");
const { transformedAssetsData } = require("../../../utils/TransformData");

const stockListDashboard = async (req, res) => {
  try {
    //Fetch all markets
    const allMarkets = await MarketModel.aggregate([
      {
        $match: {
          deleted_at: null,
        },
      },
      {
        $addFields: {
          customOrder: {
            $switch: {
              branches: [
                {
                  case: { $eq: [{ $toLower: "$market_name" }, "us market"] },
                  then: -3,
                },
                {
                  case: {
                    $eq: [{ $toLower: "$market_name" }, "crypto market"],
                  },
                  then: -2,
                },
                {
                  case: {
                    $eq: [{ $toLower: "$market_name" }, "indian market"],
                  },
                  then: -1,
                },
              ],
              default: 0,
            },
          },
        },
      },
      { $sort: { customOrder: 1 } },
    ]);

    // Fetch 5 assets for each market
    const assetsByMarket = await Promise.all(
      allMarkets.map(async (market) => {
        const assetsForMarket = await AssetsModel.find({
          market_id: market._id,
          deleted_at: null,
        })
          .sort({ createdAt: -1 })
          .limit(5)
          .exec();
        return {
          market_id: market._id,
          market_name: market.market_name,
          assets: assetsForMarket.map((asset) => {
            const asset_image_url = `${process.env.SERVER_URL}/uploads/${asset.asset_image_url}`;
            return { ...transformedAssetsData(asset), asset_image_url };
          }),
        };
      })
    );

    // Return the response
    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      assetsByMarket,
      STATUS_MESSAGES.STOCK_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("Error occured while getting stock list details:", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = { stockListDashboard };
