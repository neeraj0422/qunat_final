const { UserModel, DeviceTokenModel } = require("../../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const AWS = require("aws-sdk");
const {
  getCommonSuccessResponse,
  getCommonErrorResponse,
} = require("../../../config/responseHandler.config");
const { sendNotification } = require("../../../utils/NotificationService");
const { sendEmail } = require("../../../utils/EmailService");
const generateOTP = require("../../../utils/GenerateOTP");

async function checkUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const lowerCaseEmail = email.toLowerCase();

    //check user is exist or not
    const existingUser = await UserModel.findOne({ email: lowerCaseEmail });
    console.log(existingUser);
    if (existingUser) {
      if (existingUser.password === null) {
        const response = getCommonErrorResponse(
          STATUS_CODES.BAD_REQUEST,
          null,
          STATUS_MESSAGES.TRY_SOCIAL_LOGIN
        );
        return res.status(STATUS_CODES.BAD_REQUEST).json(response);
      }

      // Compare the provided password with the hashed password from the database
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (passwordMatch) {
        // Generate JWT token
        const token = jwt.sign(
          { email: existingUser.email, user_id: existingUser._id },
          "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCbofkfgt+r/U10",
          { expiresIn: 3600 }
        );

        console.log("token", token);

        if (parseInt(existingUser.is_email_verified) === 0) {
          existingUser.otp = generateOTP();
          await existingUser.save();

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
                                        ${existingUser.otp}
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
          await sendEmail(existingUser.email, "Verify Your Email", dynamicData);

          //         await sendEmail(
          //           existingUser.email,
          //           "OTP Verification",
          //           `
          //   <html>
          //     <body>
          //       <p>Your OTP is: <strong>${existingUser.otp}</strong></p>
          //       <p>Please use this OTP to verify your email.</p>
          //     </body>
          //   </html>
          // `
          //         );
        }

        const userData = {
          first_name: existingUser.first_name,
          last_name: existingUser.last_name,
          email: existingUser.email,
          country: existingUser.country,
          date_of_birth: existingUser.date_of_birth,
          is_mobile_verified: existingUser.is_mobile_verified,
          is_email_verified: existingUser.is_email_verified,
        };

        const response = getCommonSuccessResponse(
          STATUS_CODES.SUCCESS,
          userData,
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
    console.log("error occured while checking login data in server " + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
}

async function test(req, res) {
  // const deviceToken = await DeviceTokenModel.find().select("device_token");
  // const deviceTokensArray = deviceToken.map(item => item.device_token);
  // if (deviceTokensArray.length) {
  //     await sendNotification("Buy TCS at 3800", deviceTokensArray);
  // }

  /* SMS send code */

  // AWS.config.update({
  //   secretAccessKey: "NZW/lPZUxSl1WAYiJwyJsfxqLqy1Anum4+XNq+D7",
  //   accessKeyId: "AKIAWJFD3IXXUG64UCUK",
  //   region: "us-east-1"
  // })
  //
  // var mobileNo = "+919428904630";
  // var OTP = 8390;
  //
  // var params = {
  //   Message: 'Welcome! your mobile verification code is: ' + OTP + '     Mobile Number is:' + mobileNo,
  //   PhoneNumber: mobileNo,
  // };
  // return new AWS.SNS({apiVersion: '2010–03–31'}).publish(params).promise()
  //     .then(message => {
  //       console.log('OTP SEND SUCCESS');
  //     }).catch(err => {
  //       console.log('Error ' + err)
  //       return err;
  //     });

  const response = getCommonErrorResponse(
    STATUS_CODES.SUCCESS,
    null,
    "Success"
  );
  return res.status(STATUS_CODES.SUCCESS).json(response);
}

module.exports = {
  checkUserLogin,
  test,
};
