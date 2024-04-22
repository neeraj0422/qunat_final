const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { NotificationModel } = require("../../../models");
const { transformedNotification } = require("../../../utils/TransformData");

const notificationList = async (req, res) => {
  try {
    const { limit, page, type } = req.validatedData;
    const { user_id } = req.user;

    // Set default values
    const pageLimit = parseInt(limit) || PAGINATION.DEFAULT_LIMIT; // Default limit to 10 items per page
    let currentPage = parseInt(page) || PAGINATION.DEFAULT_PAGE; // Default to the first page

    // Calculate the skip value based on the current page and limit
    const skip = (currentPage - 1) * pageLimit;
    let whereClause = {};

    if(type && type === 'unread'){
      whereClause.is_read = 0;
    }
    const notificationData = await NotificationModel.find({
      user_id,
      deleted_at: null,
      ...whereClause
    })
      .sort({ createdAt: -1 })
      .populate(["asset_id", 'strategy_id'])
      .skip(skip)
      .limit(pageLimit);
    if (!notificationData) {
      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        null,
        STATUS_MESSAGES.NOTIFICATION_SUCCESS
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    }

    // Count of documents in notificationData
    const totalNotifications = await NotificationModel.countDocuments({
      user_id,
      deleted_at: null,
      ...whereClause
    });

    // const transformedData = notificationData.map(transformedNotification);

    const transformedData = await Promise.all(
      notificationData.map(async (notification) => {
        const asset_image_url = `${process.env.SERVER_URL}/uploads/${notification.asset_id.asset_image_url}`;

        return {
          ...transformedNotification(notification),
          asset_image_url,
        };
      })
    );

    return res.status(STATUS_CODES.SUCCESS).json({
      data: transformedData,
      meta: {
        code: 1,
        status: STATUS_CODES.SUCCESS,
        message: STATUS_MESSAGES.NOTIFICATION_SUCCESS,
        limit: pageLimit,
        page: currentPage,
        total: totalNotifications,
      },
    });
  } catch (error) {
    console.log("Error occured while getting notification details:", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = { notificationList };
