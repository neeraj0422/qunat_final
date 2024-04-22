const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { UserModel } = require("../../../models");
const { sendEmail } = require("../../../utils/EmailService");
const generateOTP = require("../../../utils/GenerateOTP");

const emailVerification = async (req, res) => {
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
    //code for otp sending process
    const dynamicData = {
      title: "Verify Your Email",
      line1: "Hello",
      line2:
        "We have sent you this email in response to your request to verify your email",
      line3: "To verify your email, please use the OTP given below:",
      line4: "",
      line5: "",
      box: `<a
                                    href="{{link}}"
                                    target="_blank"
                                    class="v-button"
                                    style="
                                      box-sizing: border-box;
                                      display: inline-block;
                                      text-decoration: none;
                                      -webkit-text-size-adjust: none;
                                      text-align: center;
                                      color: #ffffff;
                                      background-color: #2c2e32;
                                      border-radius: 1px;
                                      -webkit-border-radius: 1px;
                                      -moz-border-radius: 1px;
                                      width: auto;
                                      max-width: 100%;
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      word-wrap: break-word;
                                      mso-border-alt: none;
                                      font-size: 14px;
                                    "
                                  >
                                    <span
                                      style="
                                        display: block;
                                        padding: 15px 40px;
                                        line-height: 120%;
                                      "
                                      ><span
                                        style="
                                          font-size: 18px;
                                          line-height: 21.6px;
                                        "
                                      >
                                        ${user.otp}
                                      </span></span
                                    >
                                  </a>`,
      link: "",
      email_ignore:
        "Please ignore this email if you've already verified your email",
      contact_title: "Contact",
      address: "Quant Trade fintech Inc.",
      contact: "support@quant11.com",
      lockImage: "",
    };
    await sendEmail(user.email, "Verify Your Email", dynamicData);
    //   await sendEmail(
    //     user.email,
    //     "OTP Verification",
    //     `
    //   <html>
    //     <body>
    //       <p>Your OTP is: <strong>${user.otp}</strong></p>
    //       <p>Please use this OTP to verify your email.</p>
    //     </body>
    //   </html>
    // `
    //   );

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      null,
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
    //code for otp sending process
    const dynamicData = {
      title: "Verify Your Email",
      line1: "Hello",
      line2:
        "We have sent you this email in response to your request to verify your email",
      line3: "To verify your email, please use the OTP given below:",
      line4: "",
      line5: "",
      box: `<a
                                    href="{{link}}"
                                    target="_blank"
                                    class="v-button"
                                    style="
                                      box-sizing: border-box;
                                      display: inline-block;
                                      text-decoration: none;
                                      -webkit-text-size-adjust: none;
                                      text-align: center;
                                      color: #ffffff;
                                      background-color: #2c2e32;
                                      border-radius: 1px;
                                      -webkit-border-radius: 1px;
                                      -moz-border-radius: 1px;
                                      width: auto;
                                      max-width: 100%;
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      word-wrap: break-word;
                                      mso-border-alt: none;
                                      font-size: 14px;
                                    "
                                  >
                                    <span
                                      style="
                                        display: block;
                                        padding: 15px 40px;
                                        line-height: 120%;
                                      "
                                      ><span
                                        style="
                                          font-size: 18px;
                                          line-height: 21.6px;
                                        "
                                      >
                                        ${user.otp}
                                      </span></span
                                    >
                                  </a>`,
      link: "",
      email_ignore:
        "Please ignore this email if you've already verified your email",
      contact_title: "Contact",
      address: "Quant Trade fintech Inc.",
      contact: "support@quant11.com",
      lockImage: "",
    };
    await sendEmail(user.email, "Verify Your Email", dynamicData);

    //   await sendEmail(
    //     user.email,
    //     "OTP Verification",
    //     `
    //   <html>
    //     <body>
    //       <p>Your OTP is: <strong>${user.otp}</strong></p>
    //       <p>Please use this OTP to verify your email.</p>
    //     </body>
    //   </html>
    // `
    //   );

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
        is_email_verified: 0,
      };
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        updatedData,
        STATUS_MESSAGES.OTP_INVALID
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    //change status
    user.is_email_verified = 1;

    // Save the updated user
    await user.save();

    const updatedData = {
      is_email_verified: user.is_email_verified,
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
  emailVerification,
  resendOTP,
  otpVerification,
};
