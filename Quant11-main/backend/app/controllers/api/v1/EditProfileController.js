const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { UserModel } = require("../../../models");
const { DeviceTokenModel } = require("../../../models");

const editProfile = async (req, res) => {
  try {
    const { user_id } = req.user;
    const {
      first_name,
      last_name,
      country,
      country_code,
      date_of_birth,
      receive_newsletter,
      receive_call_notification,
      mobile_number,
    } = req.validatedData;

    // Find the user based on user_id
    const user = await UserModel.findOne({ _id: user_id, deleted_at: null });

    if (!user) {
      // Handle the case where the user is not found
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.DATA_NOT_FOUND
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    // Update the user profile fields
    user.first_name = first_name;
    user.last_name = last_name;
    user.country = country;
    user.country_code = country_code ? country_code : null;
    user.mobile_number = mobile_number ? mobile_number : null;
    user.date_of_birth = date_of_birth;
    user.receive_newsletter = receive_newsletter;
    user.receive_call_notification = receive_call_notification;

    // Save the updated user
    await user.save();

    const updatedData = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      mobile_number: user.mobile_number ? user.mobile_number : null,
      country: user.country,
      country_code: country_code ? user.country_code : null,
      mobile_number: mobile_number ? user.mobile_number : null,
      date_of_birth: user.date_of_birth,
      receive_newsletter: user.receive_newsletter,
      receive_call_notification: user.receive_call_notification,
    };
    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      updatedData,
      STATUS_MESSAGES.EDIT_PROFILE_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("error occured while updating profile data " + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const saveDeviceToken = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { token, type } = req.body;
    const checkDuplicate = await DeviceTokenModel.findOne({
      user_id: user_id,
      device_token: token,
      type: type,
    });
    if (!checkDuplicate) {
      const deviceToken = new DeviceTokenModel({
        user_id: user_id,
        device_token: token,
        type: type,
      });
      await deviceToken.save();
    }
    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      null,
      STATUS_MESSAGES.SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("error occurred while updating device token " + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = {
  editProfile,
  saveDeviceToken,
};
