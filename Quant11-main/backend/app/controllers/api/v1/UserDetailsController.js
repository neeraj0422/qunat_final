const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { UserModel } = require("../../../models");

const userDetails = async (req, res) => {
  try {
    const { user_id } = req.user;

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

    const userData = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      country_code: user.country_code,
      mobile_number: user.mobile_number,
      country: user.country,
      date_of_birth: user.date_of_birth,
      risk_appetite: user.risk_appetite,
      trade_experience: user.trade_experience,
      receive_newsletter: user.receive_newsletter,
      receive_call_notification: user.receive_call_notification,
      app_notification: user.app_notification,
      push_notification: user.push_notification,
      sms_notification: user.sms_notification,
      email_notification: user.email_notification,
      is_sms_notification_allowed: user.is_sms_notification_allowed,
      is_email_notification_allowed: user.is_email_notification_allowed,
    };

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      userData,
      STATUS_MESSAGES.USER_DETAILS_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("Error occured while getting user details:", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = {
  userDetails,
};
