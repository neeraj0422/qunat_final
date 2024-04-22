const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { UserModel } = require("../../../models");
const { sendEmail } = require("../../../utils/EmailService");
const generateOTP = require("../../../utils/GenerateOTP");

const mobileVerification = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { country_code, mobile_number } = req.validatedData;

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

    // Update the user profile fields
    user.otp = generateOTP();
    user.country_code = country_code;
    user.mobile_number = mobile_number;

    // Save the updated user
    await user.save();
    //code for otp sending process

    const dynamicData = {
      title: "Verify Your mobile number",
      line1: "Hello",
      line2:
        "We have sent you this email in response to your request to verify your mobile number",
      line3: "To verify your mobile number, please use the OTP given below:",
      line4: "",
      line5: "",
      box: user.otp,
      link: "",
      email_ignore:
        "Please ignore this email if you've already verified your mobile number",
      contact_title: "Contact",
      address: "Quant Trade fintech Inc.",
      contact: "support@quant11.com",
      lockImage: "",
    };
    await sendEmail(user.email, "Verify Your mobile number", dynamicData);

    //   await sendEmail(
    //     user.email,
    //     "OTP Verification",
    //     `
    //   <html>
    //     <body>
    //       <p>Your OTP is: <strong>${user.otp}</strong></p>
    //       <p>Please use this OTP to verify your mobile number.</p>
    //     </body>
    //   </html>
    // `
    //   );

    const updatedData = {
      country_code: user.country_code,
      mobile_number: user.mobile_number,
    };

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      updatedData,
      STATUS_MESSAGES.OTP_SEND_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("error occured in mobile verification " + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const resendOTP = async (req, res) => {
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

    // Update the user profile fields
    user.otp = generateOTP();

    // Save the updated user
    await user.save();

    // code for sending otp

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      null,
      STATUS_MESSAGES.OTP_SEND_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("error occured while resending OTP " + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const otpVerification = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { otp } = req.validatedData;

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

    if (user.otp !== otp) {
      const updatedData = {
        is_mobile_verified: 0,
      };
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        updatedData,
        STATUS_MESSAGES.OTP_INVALID
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    //change status
    user.is_mobile_verified = 1;

    // Save the updated user
    await user.save();

    const updatedData = {
      is_mobile_verified: user.is_mobile_verified,
    };

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      updatedData,
      STATUS_MESSAGES.OTP_VERIFIED_SUCCESS
    );
    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("error occured in otp verification " + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = {
  mobileVerification,
  resendOTP,
  otpVerification,
};
