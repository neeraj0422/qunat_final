const { STATUS_MESSAGES, STATUS_CODES } = require("../../../config/constants");
const {
  getCommonSuccessResponse,
  getCommonErrorResponse,
} = require("../../../config/responseHandler.config");
const { UserModel } = require("../../../models");
const jwt = require("jsonwebtoken");


const googleSignUp = async (req, res) => {
  try {
    const { email, first_name, last_name } = req.body;

    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.EMAIL_ALREADY_REGISTERED
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    // Create a new user
    const newUser = new UserModel({
      first_name,
      last_name,
      email,
      country: null,
      date_of_birth: null,
      password: null,
      is_social_login: true,
    });

    // Save the new user to the database
    await newUser.save();

    const newUserInfo = {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      country: newUser.country,
      date_of_birth: newUser.date_of_birth,
      is_mobile_verified: newUser.is_mobile_verified,
      is_email_verified: newUser.is_email_verified,
      is_social_login: newUser.is_social_login,
    };

    // Generate JWT token
    const token = jwt.sign(
      { email: newUser.email, user_id: newUser._id },
      'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCbofkfgt+r/U10',
      { expiresIn: 360000 }
    );

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      newUserInfo,
      STATUS_MESSAGES.GOOGLE_SIGNUP_SUCCESS,
      token
    );

    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("error occured while signup using google " + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const googleSignIn = async (req, res) => {
  try {
    const { email } = req.body;

    const lowerCaseEmail = email.toLowerCase();

    //check user is exist or not
    const existingUser = await UserModel.findOne({ email: lowerCaseEmail });
    console.log("exixting",existingUser);
    if (existingUser) {
      // Generate JWT token
      const token = jwt.sign(
        { email: existingUser.email, user_id: existingUser._id },
        'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCbofkfgt+r/U10',
         
        { expiresIn: 3600 }
      );

      const userData = {
        // first_name: existingUser.first_name,
        // last_name: existingUser.last_name,
        email: existingUser.email,
        // country: existingUser.country,
        // date_of_birth: existingUser.date_of_birth,
        // is_mobile_verified: existingUser.is_mobile_verified,
        // is_email_verified: existingUser.is_email_verified,
      };

      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        userData,
        STATUS_MESSAGES.GOOGLE_LOGIN_SUCCESS,
        token
      );
      return res.status(STATUS_CODES.SUCCESS).json(response);
    } else {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.DATA_NOT_FOUND
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }
  } catch (error) {
    console.log("error occured while login using google " + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = {
  googleSignUp,
  googleSignIn,
};
