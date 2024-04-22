const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { UserModel } = require("../../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateOTP = require("../../../utils/GenerateOTP");
const { sendEmail } = require("../../../utils/EmailService");

const signup = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      country,
      date_of_birth,
      mobile_number,
      country_code,
    } = req.validatedData;

    const lowerCaseEmail = email.toLowerCase();

    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email: lowerCaseEmail });
    if (existingUser) {
      const response = getCommonErrorResponse(
        STATUS_CODES.BAD_REQUEST,
        null,
        STATUS_MESSAGES.EMAIL_ALREADY_REGISTERED
      );
      return res.status(STATUS_CODES.BAD_REQUEST).json(response);
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      first_name,
      last_name,
      email: lowerCaseEmail,
      password: hashedPassword, // You should hash the password before saving it to the database
      country,
      date_of_birth,
      mobile_number: mobile_number ? mobile_number : null,
      country_code: country_code ? country_code : null,
      otp: generateOTP(),
    });

    // Save the new user to the database
    await newUser.save();

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
                                        ${newUser.otp}
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
    await sendEmail(newUser.email, "Verify Your Email", dynamicData);

    //   await sendEmail(
    //     newUser.email,
    //     "OTP Verification",
    //     `
    //   <html>
    //     <body>
    //       <p>Your OTP is: <strong>${newUser.otp}</strong></p>
    //       <p>Please use this OTP to verify your email.</p>
    //     </body>
    //   </html>
    // `
    //   );

    const newUserInfo = {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      country: newUser.country,
      date_of_birth: newUser.date_of_birth,
      is_mobile_verified: newUser.is_mobile_verified,
      is_email_verified: newUser.is_email_verified,
      mobile_number: country_code ? newUser.country_code : null,
      country_code: country_code ? newUser.country_code : null,
    };

    // Generate JWT token
    const token = jwt.sign(
      { email: newUser.email, user_id: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      newUserInfo,
      STATUS_MESSAGES.SIGNUP_SUCCESS,
      token
    );
    return res.status(STATUS_CODES.CREATED).json(response);
  } catch (error) {
    console.log("error occured while signup " + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = {
  signup,
};
