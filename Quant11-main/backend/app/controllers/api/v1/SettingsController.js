const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { UserModel } = require("../../../models");

const settings = async (req, res) => {
  try {
    const { user_id } = req.user;
    const {
      risk_appetite,
      trade_experience,
      app_notification,
      push_notification,
      sms_notification,
      email_notification,
    } = req.validatedData;

    // Find the user based on user_id
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

    // Update the user profile fields if they are present in the request body
    if (risk_appetite !== undefined) user.risk_appetite = risk_appetite;
    if (trade_experience !== undefined)
      user.trade_experience = trade_experience;
    if (app_notification !== undefined)
      user.app_notification = app_notification;
    if (push_notification !== undefined)
      user.push_notification = push_notification;
    if (
      sms_notification !== undefined &&
      user.is_sms_notification_allowed === true
    )
      user.sms_notification = sms_notification;
    if (
      email_notification !== undefined &&
      user.is_email_notification_allowed === true
    )
      user.email_notification = email_notification;

    // Save the updated user
    await user.save();

    const updatedSettings = {
      risk_appetite: user.risk_appetite,
      trade_experience: user.trade_experience,
      app_notification: user.app_notification,
      push_notification: user.push_notification,
      sms_notification: user.sms_notification,
      email_notification: user.email_notification,
    };

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      updatedSettings,
      STATUS_MESSAGES.UPDATE_SETTING_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("error occured while updating settings" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = {
  settings,
};
