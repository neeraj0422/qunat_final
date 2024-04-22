const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const { UserModel } = require("../../../models");
const ForgetPasswordModel = require("../../../models/ForgetPasswordModel");
const { sendEmail } = require("../../../utils/EmailService");
const { generateUniqueToken } = require("../../../utils/generateRandomString");

async function forgetPassword(req, res) {
  try {
    const { email } = req.validatedData;

    //check user is exist or not
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      // Generate a random string as a token
      const token = await generateUniqueToken(ForgetPasswordModel);

      // Check if there is already a record for this user in ForgetPasswordModel
      let forgetPasswordRecord = await ForgetPasswordModel.findOne({ email });

      if (!forgetPasswordRecord) {
        // If there is no existing record, create a new one
        forgetPasswordRecord = new ForgetPasswordModel({
          email,
          token,
          user_id: existingUser._id,
        });
      } else {
        // If there is an existing record, update it with the latest data
        forgetPasswordRecord.token = token;
        forgetPasswordRecord.user_id = existingUser._id;
      }

      await forgetPasswordRecord.save();

      // Send forget password email
      //   await sendForgetPasswordEmail(email, token);

      const dynamicData = {
        title: "Reset Your Password",
        line1: "Hello",
        line2:
          "We have sent you this email in response to your request to reset your password",
        line3: "To reset your password, click on the button below:",
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
                                        Reset Password
                                      </span></span
                                    >
                                  </a>`,
        link: `${process.env.CLIENT_SIDE_URL}/reset-password/${token}`,
        email_ignore:
          "Please ignore this email if you've already reset your password",
        contact_title: "Contact",
        address: "Quant Trade fintech Inc.",
        contact: "support@quant11.com",
        lockImage: `<img
           align="center"
           border="0"
           src="https://quant11images.s3.amazonaws.com/email-assets/image-5.png"
           alt="Image-5"
           title="Image"
           style="
                  outline: none; text-decoration: none;
                  -ms-interpolation-mode: bicubic; clear:
                  both; display: inline-block !important;
                  border: none; height: auto; float: none;
                  width: 8%; max-width: 46.4px; "
           width="46.4"
         />`,
      };
      await sendEmail(email, "Reset Your Password", dynamicData);

      //     await sendEmail(
      //       email,
      //       "Forget Password - Reset Your Password",
      //       `
      //   <html>
      //     <body>
      //       <p>Hello!</p>
      //       <p>You have requested to reset your password. Click the link below to reset it:</p>
      //       <a href="${process.env.CLIENT_SIDE_URL}/reset-password/${token}">Reset Password</a>
      //     </body>
      //   </html>
      // `
      //     );

      const response = getCommonSuccessResponse(
        STATUS_CODES.SUCCESS,
        null,
        STATUS_MESSAGES.FORGET_SUCCESS
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
    console.log("error occured while forgetting password " + error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
}

module.exports = {
  forgetPassword,
};
