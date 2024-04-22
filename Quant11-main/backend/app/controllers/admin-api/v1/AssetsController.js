const mongoose = require("mongoose");
const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const {
  AssetsModel,
  StrategyModel,
  TradesModel,
  NotificationModel,
} = require("../../../models/");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const { transformedAssetsData } = require("../../../utils/TransformData");

const addUpdateAsset = async (req, res) => {
  try {
    // Create a new instance of the formidable.IncomingForm class
    const form = new formidable.IncomingForm();

    // Set the upload directory for the files
    const uploadDir = path.join(__dirname, "../../../../public/uploads");
    form.uploadDir = uploadDir;

    // Check if the directory exists, create it if necessary
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Parse the incoming form data
    form.parse(req, async (err, fields, files) => {
      if (err) {
        throw new Error("Error parsing form data");
      }

      // Extract the details from the parsed form data
      const { id, asset_name, market_id, ticker_symbol } = fields;

      // Convert asset_name and market_id to strings if they are arrays
      const normalizedId = Array.isArray(id) ? id[0] : id;
      const normalizedAssetName = Array.isArray(asset_name)
        ? asset_name[0]
        : asset_name;
      const normalizedMarketId = Array.isArray(market_id)
        ? market_id[0]
        : market_id;
      const normalizedTickerSymbol = Array.isArray(ticker_symbol)
        ? ticker_symbol[0]
        : ticker_symbol;

      if (
        // !normalizedId ||
        // !normalizedAssetName ||
        // !normalizedMarketId ||
        !normalizedTickerSymbol ||
        normalizedTickerSymbol === "null"
      ) {
        const response = getCommonErrorResponse(
          STATUS_CODES.BAD_REQUEST,
          null,
          STATUS_MESSAGES.ASSET_FIELD_MISSING
        );
        return res.status(STATUS_CODES.BAD_REQUEST).json(response);
      }

      const asset_image = files && files.asset_image; // Check if files contain asset_image
      let fileName;
      if (asset_image) {
        if (!asset_image[0] || !asset_image[0].filepath) {
          throw new Error("File path is not available.");
        }
        const randomString = Math.random().toString(36).substring(2, 15); // Generate a random string

        // Generate a unique filename for the uploaded image
        fileName = `${Date.now()}_${randomString}_${
          asset_image[0].originalFilename
        }`;

        // Move the file to the specified upload directory
        const filePath = path.join(form.uploadDir, fileName);

        // Check if the directory exists, create it if necessary
        if (!fs.existsSync(form.uploadDir)) {
          fs.mkdirSync(form.uploadDir, { recursive: true });
        }

        // Move the file to the destination
        fs.renameSync(asset_image[0].filepath, filePath);
      }

      //id exist then find asset and update else create new one
      if (normalizedId) {
        const existingAsset = await AssetsModel.findOne({
          _id: normalizedId,
          deleted_at: null,
        });

        //get all data which has assets id

        if (existingAsset) {
          // Check for existing assets with the same market_id and asset_name
          const duplicateAssets = await AssetsModel.find({
            _id: { $ne: existingAsset._id },
            market_id: mongoose.Types.ObjectId(normalizedMarketId),
            asset_name: normalizedAssetName,
            ticker_symbol: normalizedTickerSymbol,
            deleted_at: null,
          });

          if (duplicateAssets && duplicateAssets.length > 0) {
            const response = getCommonErrorResponse(
              STATUS_CODES.BAD_REQUEST,
              null,
              STATUS_MESSAGES.ASSET_ALREADY_EXIST
            );
            return res.status(STATUS_CODES.BAD_REQUEST).json(response);
          }

          // Update only the fields that are present in the request
          existingAsset.asset_name =
            normalizedAssetName || existingAsset.asset_name;
          existingAsset.ticker_symbol = normalizedTickerSymbol;

          let asset_image_url;

          // Update asset_image field only if files.asset_image is present
          if (files.asset_image) {
            // Unlink the previous asset image file
            if (existingAsset.asset_image) {
              const previousImagePath = path.join(
                uploadDir,
                existingAsset.asset_image
              );
              if (fs.existsSync(previousImagePath)) {
                fs.unlinkSync(previousImagePath);
              }
            }

            // existingAsset.asset_image = fileName;

            // Construct the image URL and add it to the response
            // const asset_image_url = `${req.protocol}://${req.get(
            //   "host"
            // )}/uploads/${fileName}`;
            // const asset_image_url = `${req.protocol}://${process.env.SERVER_URL}/uploads/${fileName}`;
            asset_image_url = `${process.env.SERVER_URL}/uploads/${fileName}`;

            existingAsset.asset_image_url = fileName;
          }
          // else {
          //   existingAsset.asset_image = existingAsset.asset_image;
          // }
          existingAsset.market_id =
            mongoose.Types.ObjectId(normalizedMarketId) ||
            existingAsset.market_id;

          await existingAsset.save();

          // Transform the asset data using the transformer function
          const transformedAssetData = transformedAssetsData(existingAsset);

          const response = getCommonSuccessResponse(
            STATUS_CODES.SUCCESS,
            { ...transformedAssetData, asset_image_url },
            STATUS_MESSAGES.ASSET_UPDATE_SUCCESS
          );
          return res.status(STATUS_CODES.SUCCESS).json(response);
        } else {
          const response = getCommonErrorResponse(
            STATUS_CODES.BAD_REQUEST,
            null,
            STATUS_MESSAGES.ASSET_DATA_NOT_FOUND
          );
          return res.status(STATUS_CODES.BAD_REQUEST).json(response);
        }
      } else {
        if (
          !normalizedAssetName ||
          !fileName ||
          !normalizedMarketId ||
          normalizedTickerSymbol === "undefined"
        ) {
          const response = getCommonErrorResponse(
            STATUS_CODES.BAD_REQUEST,
            null,
            STATUS_MESSAGES.ASSET_FIELD_MISSING
          );
          return res.status(STATUS_CODES.BAD_REQUEST).json(response);
        }

        // Check for existing assets with the same market_id and asset_name
        const duplicateAssets = await AssetsModel.find({
          market_id: mongoose.Types.ObjectId(normalizedMarketId),
          asset_name: normalizedAssetName,
          ticker_symbol: normalizedTickerSymbol,
          deleted_at: null,
        });

        if (duplicateAssets && duplicateAssets.length > 0) {
          const response = getCommonErrorResponse(
            STATUS_CODES.BAD_REQUEST,
            null,
            STATUS_MESSAGES.ASSET_ALREADY_EXIST
          );
          return res.status(STATUS_CODES.BAD_REQUEST).json(response);
        }

        // Construct the image URL and add it to the response
        // let asset_image_url = `${req.protocol}://${req.get(
        //   "host"
        // )}/uploads/${fileName}`;
        const asset_image_url = `${process.env.SERVER_URL}/uploads/${fileName}`;

        // Create a new asset document in the database
        const newAsset = new AssetsModel({
          asset_name: normalizedAssetName, // Save the filename in the database
          ticker_symbol: normalizedTickerSymbol,
          // asset_image: fileName,
          market_id: mongoose.Types.ObjectId(normalizedMarketId),
          asset_image_url: fileName,
        });

        // Save the asset document to the database
        await newAsset.save();

        // Transform the asset data using the transformer function
        const transformedAssetData = transformedAssetsData(newAsset);

        // Send a success response
        const response = getCommonSuccessResponse(
          STATUS_CODES.SUCCESS,
          { ...transformedAssetData, asset_image_url },
          STATUS_MESSAGES.ASSET_ADD_SUCCESS
        );
        return res.status(STATUS_CODES.SUCCESS).json(response);
      }
    });
  } catch (error) {
    console.log("Error occurred while Adding or Updating asset data:", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const allAssetsData = async (req, res) => {
  try {
    //find all assets data
    const assets = await AssetsModel.find({ deleted_at: null })
      .sort({ createdAt: -1 })
      .populate("market_id");
    // Transform the assets using the transformer function
    const transformedAssets = assets.map((asset) => {
      const asset_image_url = `${process.env.SERVER_URL}/uploads/${asset.asset_image_url}`;
      return { ...transformedAssetsData(asset), asset_image_url };
    });

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      transformedAssets,
      STATUS_MESSAGES.ASSET_DATA_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("Error occurred while fetching all assets data:", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const allAssetsDataWithPagination = async (req, res) => {
  try {
    const { limit, page } = req.body;

    // Set default values
    const pageLimit = parseInt(limit) || PAGINATION.DEFAULT_LIMIT; // Default limit to 10 items per page
    let currentPage = parseInt(page) || PAGINATION.DEFAULT_PAGE; // Default to the first page

    // Fetch total number of assets
    const totalAssets = await AssetsModel.countDocuments({ deleted_at: null });

    // Calculate the skip value based on the current page and limit
    const skip = (currentPage - 1) * pageLimit;

    // Fetch assets with pagination from the database
    const assets = await AssetsModel.find({ deleted_at: null })
      .populate("market_id")
      .skip(skip)
      .limit(pageLimit);

    // Transform the assets using the transformer function
    const transformedAssets = assets.map((asset) => {
      const asset_image_url = `${process.env.SERVER_URL}/uploads/${asset.asset_image_url}`;
      return { ...transformedAssetsData(asset), asset_image_url };
    });

    return res.status(STATUS_CODES.SUCCESS).json({
      data: transformedAssets,
      meta: {
        code: 1,
        status: STATUS_CODES.SUCCESS,
        message: STATUS_MESSAGES.ASSET_DATA_SUCCESS,
        limit: pageLimit,
        page: currentPage,
        total: totalAssets,
      },
    });
  } catch (error) {
    console.log("error occured while fetching assets data" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const deleteSingleAsset = async (req, res) => {
  try {
    const id = req.params.id;

    //check assets is exist or not
    const asset = await AssetsModel.findOne({
      _id: id,
      deleted_at: null,
    });

    if (asset) {
      // Find and soft delete associated strategies
      const strategiesToDelete = await StrategyModel.find({
        asset_id: asset._id,
        deleted_at: null,
      });
      for (const strategy of strategiesToDelete) {
        await strategy.softStrategyDelete();
      }

      // Find and soft delete associated trades
      const tradesToDelete = await TradesModel.find({
        asset_id: asset._id,
        deleted_at: null,
      });
      for (const trade of tradesToDelete) {
        await trade.softTradeDelete();
      }

      // Find and soft delete associated notification
      const notificationToDelete = await NotificationModel.find({
        asset_id: asset._id,
        deleted_at: null,
      });
      for (const notification of notificationToDelete) {
        await notification.softNotificationDelete();
      }

      // Soft delete the asset
      await asset.softAssetDelete();

      // If condition is truthy, it means a document was deleted successfully
      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        null,
        STATUS_MESSAGES.ASSET_DELETE_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    } else {
      // If condition is false, it means the document with the specified ID wasn't found
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.ASSET_DATA_NOT_FOUND
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }
  } catch (error) {
    console.log("error occured while deleting assets data" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const getSingleAssetData = async (req, res) => {
  try {
    const id = req.params.id;

    //check asset is exist or not
    const existingAsset = await AssetsModel.findOne({
      _id: id,
      deleted_at: null,
    }).populate("market_id");

    if (existingAsset) {
      // Transform the asset data using the transformer function
      const asset_image_url = `${process.env.SERVER_URL}/uploads/${existingAsset.asset_image_url}`;
      const transformedAssetData = transformedAssetsData(existingAsset);

      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        { ...transformedAssetData, asset_image_url },
        STATUS_MESSAGES.ASSET_DATA_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    } else {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.ASSET_DATA_NOT_FOUND
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }
  } catch (error) {
    console.log("error occured while fetching single asset data" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = {
  addUpdateAsset,
  allAssetsData,
  allAssetsDataWithPagination,
  deleteSingleAsset,
  getSingleAssetData,
};
