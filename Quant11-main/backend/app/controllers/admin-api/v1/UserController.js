const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonSuccessResponse,
  getCommonErrorResponse,
} = require("../../../config/responseHandler.config");
const {
  UserModel,
  DeviceTokenModel,
  FollowModel,
  NotificationModel,
  TradesModel,
} = require("../../../models");
const { transformedUserData } = require("../../../utils/TransformData");

const getAllUser = async (req, res) => {
  try {
    const usersData = await UserModel.find({ deleted_at: null });

    if (!usersData || usersData.data < 1) {
      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        null,
        STATUS_MESSAGES.NO_USER_AVAILABLE
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    }

    const transformedData = usersData.map(transformedUserData);
    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      transformedData,
      STATUS_MESSAGES.USER_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("error occured while fetching all user data list" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const updateSingleUser = async (req, res) => {
  try {
    const {
      id,
      email,
      mobile_number,
      country_code,
      is_email_notification_allowed,
      is_sms_notification_allowed,
    } = req.validatedData;

    const user = await UserModel.findOne({ _id: id, deleted_at: null });

    if (!user) {
      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        null,
        STATUS_MESSAGES.NO_USER_AVAILABLE
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    }

    // Check if the provided email is different and not already in use by another user
    if (email && email !== user.email) {
      const existingUserWithEmail = await UserModel.findOne({
        email,
        _id: { $ne: id },
      });

      if (existingUserWithEmail) {
        const response = getCommonErrorResponse(
          STATUS_CODES.BAD_REQUEST,
          null,
          STATUS_MESSAGES.USER_EMAIL_ALREADY_EXISTS
        );
        return res.status(STATUS_CODES.BAD_REQUEST).json(response);
      }
    }

    user.email = email.toLowerCase();
    user.mobile_number = mobile_number || null;
    user.country_code = country_code || null;
    user.is_email_notification_allowed = is_email_notification_allowed;
    user.is_sms_notification_allowed = is_sms_notification_allowed;

    if (is_email_notification_allowed === false) {
      user.email_notification = false;
    }
    if (is_sms_notification_allowed === false) {
      user.sms_notification = false;
    }

    await user.save();

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      null,
      STATUS_MESSAGES.USER_UPDATE_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("error occured while fetching all user data list" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const deleteSingleUser = async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.findOne({ _id: id, deleted_at: null });

  if (!user) {
    const response = getCommonErrorResponse(
      STATUS_CODES.BAD_REQUEST,
      null,
      STATUS_MESSAGES.USER_NOT_FOUND
    );
    return res.status(STATUS_CODES.BAD_REQUEST).json(response);
  }

  await user.softUserDelete();

  //find and delete associated device tokens
  const deviceToken = await DeviceTokenModel.findOne({
    user_id: id,
    deleted_at: null,
  });
  if (deviceToken) {
    await deviceToken.softDeviceTokenDelete();
  }

  //find and delete associated follow data
  const follow = await FollowModel.findOne({
    user_id: id,
    deleted_at: null,
  });

  if (follow) {
    await follow.softFollowDelete();
  }

  //find and delete associated notification data
  const notification = await NotificationModel.findOne({
    user_id: id,
    deleted_at: null,
  });

  if (notification) {
    await notification.softNotificationDelete();
  }

  //find and delete associated trades data
  const trade = await TradesModel.findOne({
    user_id: id,
    deleted_at: null,
  });

  if (trade) {
    await trade.softTradeDelete();
  }

  const response = getCommonSuccessResponse(
    STATUS_CODES.SUCCESS,
    null,
    STATUS_MESSAGES.USER_DELETE_SUCCESS
  );
  return res.status(STATUS_CODES.SUCCESS).json(response);
};

module.exports = {
  getAllUser,
  updateSingleUser,
  deleteSingleUser,
};
