const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { UserModel } = require("../../../models");
const bcrypt = require("bcrypt");

async function changePassword(req, res) {
  try {
    const { user_id } = req.user;
    const { password, old_password } = req.validatedData;

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

    // Verify the old password using bcrypt
    const isPasswordValid = await bcrypt.compare(old_password, user.password);
    const similarPassword = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Handle the case where the old password is incorrect
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.INVALID_OLD_PASSWORD
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }
    if (similarPassword) {
      // Handle the case where the old password and new password is similar
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.SIMILAR_PASSWORD
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.updateOne(
      { _id: user_id },
      { $set: { password: hashedPassword } }
    );

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      null,
      STATUS_MESSAGES.CHANGE_PASSWORD_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("Error changing password:", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
}

module.exports = {
  changePassword,
};
