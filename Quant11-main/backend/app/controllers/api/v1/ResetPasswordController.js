const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { UserModel } = require("../../../models");
const ForgetPasswordModel = require("../../../models/ForgetPasswordModel");
const bcrypt = require("bcrypt");

async function resetPassword(req, res) {
  try {
    const { token, password } = req.validatedData;

    // Find the user in the ForgetPasswordModel using the token
    const forgetPasswordRecord = await ForgetPasswordModel.findOne({ token });

    if (!forgetPasswordRecord) {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.RESET_INVALID
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    // Update the user's password in the UserModel
    const user = await UserModel.findById(forgetPasswordRecord.user_id);
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.updateOne(
      { _id: forgetPasswordRecord.user_id },
      { $set: { password: hashedPassword } }
    );

    await forgetPasswordRecord.remove();

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      null,
      STATUS_MESSAGES.RESET_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("Error resetting password:" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
}

module.exports = {
  resetPassword,
};
