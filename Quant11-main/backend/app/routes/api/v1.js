const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../../middlewares/authenticateToken");
const { validate } = require("../../requestValidator/Validator");
const {
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
  otpVerification,
  resendOTP,
} = require("../../controllers/api/v1");
const {
  loginSchema,
  emailSchema,
  resetPasswordSchema,
  changePasswordSchema,
  editProfileSchema,
  signupSchema,
  otpVerificationSchema,
  userExperianceSchema,
  settingsSchema,
  strategyDetailsSchema,
  tradeValidation,
  notificationListValidation,
  riskAppetiteSchema,
  notificationSchema,
  tradeExperienceSchema,
} = require("../../requestValidator/Validations");
const {
  stockListDashboard,
} = require("../../controllers/api/v1/StockController");
const {
  allAssetsBasedOnMarket,
} = require("../../controllers/api/v1/MarketController");
const { webhook } = require("../../controllers/api/v1/WebhookController");
const {
  followStrategy,
  assetsWiseStrategies,
  strategiesDetails,
  unFollowStrategy,
} = require("../../controllers/api/v1/StrategyController");
const {
  openTrades,
  closeTrades,
  closeTradeDataWithoutPagination,
} = require("../../controllers/api/v1/TradeController");
const {
  updateRiskAppetite,
  updateNotificationSettings,
  updateTradeExperience,
} = require("../../controllers/api/v1/MobileAppController");
const {
  getYahooFinanceHistoricalData,
} = require("../../controllers/api/v1/YahooFinanceDataController");

// Assign controllers to routes
router.get("/test", test);
router.post("/login", checkUserLogin);
router.post("/forget-password", validate(emailSchema), forgetPassword);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);

router.post(
  "/change-password",
  [authenticateToken, validate(changePasswordSchema)],
  changePassword
);

router.post(
  "/edit-profile",
  [authenticateToken, validate(editProfileSchema)],
  editProfile
);

router.post("/device-token", [authenticateToken], saveDeviceToken);

router.post(
  "/settings",
  [authenticateToken, validate(settingsSchema)],
  settings
);

router.post("/signup", validate(signupSchema), signup);
//mobile verification
// router.post(
//   "/send-otp",
//   [authenticateToken, validate(mobileVerificationSchema)],
//   mobileVerification
// );

//email verification
router.post("/send-otp", authenticateToken, emailVerification);

router.get("/resend-otp", authenticateToken, resendOTP);
router.post(
  "/verify-otp",
  [authenticateToken, validate(otpVerificationSchema)],
  otpVerification
);

router.post(
  "/risk-tolerance",
  [authenticateToken, validate(userExperianceSchema)],
  addUserExperiance
);

router.get("/user-details", authenticateToken, userDetails);

//stock list api for dashboard
router.get("/stock/list", authenticateToken, stockListDashboard);

//market
router.post("/market/assets", authenticateToken, allAssetsBasedOnMarket);

//webhook api
router.post("/webhook", webhook);

//Follow strategy api
router.post("/follow-strategy", authenticateToken, followStrategy);
router.post("/unfollow-strategy", authenticateToken, unFollowStrategy);

// asset wise strategy api with pagination
router.post("/assets/strategies", authenticateToken, assetsWiseStrategies);

//strategy apis
router.post(
  "/strategies/details",
  [authenticateToken, validate(strategyDetailsSchema)],
  strategiesDetails
);

//open and close trade api
router.post(
  "/trades/open",
  [authenticateToken, validate(tradeValidation)],
  openTrades
);
router.post(
  "/trades/close",
  [authenticateToken, validate(tradeValidation)],
  closeTrades
);
router.post(
  "/trades/close/all",
  authenticateToken,
  closeTradeDataWithoutPagination
);

//notification list api
router.post(
  "/notifications/list",
  [authenticateToken, validate(notificationListValidation)],
  notificationList
);

//clear notification Latest alert
router.post(
  "/notifications/mark-as-read",
  [authenticateToken],
  clearNotification
);

//Yahoo finance
router.post("/yahoo-finance", authenticateToken, getYahooFinanceData);
router.post(
  "/yahoo-finance/historical-data",
  authenticateToken,
  getYahooFinanceHistoricalData
);

//logout api
router.get("/logout", authenticateToken, logOutUser);

//google auth
router.post("/google-signup", googleSignUp);
router.post("/google-signin", googleSignIn);

//mobile app api
router.post(
  "/manage-risk-appetite",
  [authenticateToken, validate(riskAppetiteSchema)],
  updateRiskAppetite
);
router.post(
  "/manage-trade-experience",
  [authenticateToken, validate(tradeExperienceSchema)],
  updateTradeExperience
);
router.post(
  "/manage-notification-settings",
  [authenticateToken, validate(notificationSchema)],
  updateNotificationSettings
);
module.exports = router;
