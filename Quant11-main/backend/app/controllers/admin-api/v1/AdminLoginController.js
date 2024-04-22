const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AdminModel = require("../../../models/AdminModel");

const checkAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.validatedData;

    const lowerCaseEmail = email.toLowerCase();

    //check user is exist or not
    const existingAdmin = await AdminModel.findOne({ email: lowerCaseEmail });

    if (existingAdmin) {
      // Compare the provided password with the hashed password from the database
      const passwordMatch = await bcrypt.compare(
        password,
        existingAdmin.password
      );

      if (passwordMatch) {
        // Generate JWT token
        const token = jwt.sign(
          { email: existingAdmin.email, user_id: existingAdmin._id },
          process.env.JWT_ADMIN_SECRET_KEY,
          { expiresIn: process.env.JWT_EXPIRATION }
        );

        const adminResponseData = {
          first_name: existingAdmin.first_name,
          last_name: existingAdmin.last_name,
          display_name: existingAdmin.display_name,
          user_type: existingAdmin.user_type,
          email: existingAdmin.email,
        };

        const response = getCommonSuccessResponse(
          STATUS_CODES.SUCCESS,
          adminResponseData,
          STATUS_MESSAGES.LOGIN_SUCCESS,
          token
        );
        return res.status(STATUS_CODES.SUCCESS).json(response);
      } else {
        const response = getCommonErrorResponse(
          STATUS_CODES.BAD_REQUEST,
          null,
          STATUS_MESSAGES.INVALID_PASSWORD
        );
        return res.status(STATUS_CODES.BAD_REQUEST).json(response);
      }
    } else {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.DATA_NOT_FOUND
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }
  } catch (error) {
    console.log("error occured while login as a admin" + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = {
  checkAdminLogin,
};
