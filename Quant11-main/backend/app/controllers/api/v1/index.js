const { forgetPassword } = require("./ForgetPasswordController");
const { checkUserLogin, test } = require("./LoginController");
const { resetPassword } = require("./ResetPasswordController");
const { changePassword } = require("./ChangePasswordController");
const { editProfile, saveDeviceToken } = require("./EditProfileController");
const { settings } = require("./SettingsController");
const { signup } = require("./signupController");
const {
  emailVerification,
  resendOTP,
  otpVerification,
} = require("./EmailVerification");
const { addUserExperiance } = require("./RiskToleranceController");
const { userDetails } = require("./UserDetailsController");
const { notificationList } = require("./NotificationController");
const { clearNotification } = require("./ClearNotificationController")
const { getYahooFinanceData } = require("./YahooFinanceDataController")
const { logOutUser } = require("./LogOutController");
const { googleSignUp, googleSignIn } = require("./GoogleAuthController");

const {
  unFollowStrategy,
  followStrategy,
  assetsWiseStrategies,
  strategiesDetails,
} = require("./StrategyController");

module.exports = {
  test,
  checkUserLogin,
  forgetPassword,
  resetPassword,
  changePassword,
  editProfile,
  saveDeviceToken,
  signup,
  addUserExperiance,
  userDetails,
  settings,
  notificationList,
  clearNotification,
  getYahooFinanceData,
  logOutUser,
  googleSignUp,
  googleSignIn,
  emailVerification,
  resendOTP,
  otpVerification,
  unFollowStrategy,
  followStrategy,
  assetsWiseStrategies,
  strategiesDetails,
};
