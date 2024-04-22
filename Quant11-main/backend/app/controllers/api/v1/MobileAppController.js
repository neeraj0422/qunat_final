//quant11 mobile app settings api
const { STATUS_MESSAGES, STATUS_CODES } = require("../../../config/constants");
const {
  getCommonSuccessResponse,
  getCommonErrorResponse,
} = require("../../../config/responseHandler.config");
const { UserModel } = require("../../../models");

const updateRiskAppetite = async (req, res) => {
  try {
    const { risk_appetite } = req.validatedData;
    const { user_id } = req.user;

    //find user and update user's data
    const user = await UserModel.findById(user_id);
    if (!user) {
      // Handle the case where the user is not found
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.DATA_NOT_FOUND
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }
    user.risk_appetite = risk_appetite;
    await user.save();

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      user,
      STATUS_MESSAGES.RISK_APPETITE_UPDATE_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("Error occured while updating risk appetite data", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};
const updateTradeExperience = async (req, res) => {
  try {
    const { trade_experience } = req.validatedData;
    const { user_id } = req.user;

    //find user and update user's data
    const user = await UserModel.findById(user_id);
    if (!user) {
      // Handle the case where the user is not found
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.DATA_NOT_FOUND
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }
    user.trade_experience = trade_experience;
    await user.save();

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      user,
      STATUS_MESSAGES.TRADE_EXPERIENCE_UPDATE_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("Error occured while updating trade experience data", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const updateNotificationSettings = async (req, res) => {
  try {
    const {
      app_notification,
      push_notification,
      sms_notification,
      email_notification,
    } = req.validatedData;

    const { user_id } = req.user;

    //find user and update user's data
    const user = await UserModel.findById(user_id);

    if (!user) {
      // Handle the case where the user is not found
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.DATA_NOT_FOUND
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    user.app_notification = app_notification;
    user.push_notification = push_notification;
    if (
      sms_notification !== undefined &&
      user.is_sms_notification_allowed === true
    ) {
      user.sms_notification = sms_notification;
    }
    if (
      email_notification !== undefined &&
      user.is_email_notification_allowed === true
    ) {
      user.email_notification = email_notification;
    }
    await user.save();

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      user,
      STATUS_MESSAGES.NOTIFICATION_SETTINGS_UPDATE_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("Error occured while updating notification settings", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = {
  updateRiskAppetite,
  updateNotificationSettings,
  updateTradeExperience,
};
