exports.STATUS_CODES = {
  // 2XX SUCCESS
  SUCCESS: 200,
  CREATED: 201,

  // 4XX CLIENT ERROR
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ALLOWED: 405,

  // 5XX SERVER ERROR
  SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
};

exports.STATUS_MESSAGES = {
  NO_TOKEN:
    "Access denied. You do not have the required permissions to access this resource.",
  INVALID_TOKEN:
    "Authentication error. The provided token is invalid or has expired. Please log in again to obtain a valid token.",
  LOGIN_SUCCESS: "Login successful.",
  INVALID_PASSWORD: "Login failed: Incorrect password.",
  DATA_NOT_FOUND: "You are not registered. Kindly sign up to proceed.",
  SERVER_ERROR: "Internal server error. Please try again later.",
  SUCCESS: "Success",
  UPDATE: "Updated successfully",
  ADD: "Added successfully",
  FORGET_SUCCESS:
    "Password reset initiated successfully. Please follow the instructions sent to your email.",
  RESET_SUCCESS: "Password reset completed successfully.",
  RESET_INVALID:
    "Password reset failed. Your details do not exist in the system. Please try initiating the forget password process again.",
  CHANGE_PASSWORD_SUCCESS: "Password changed successfully.",
  INVALID_OLD_PASSWORD: "Provided old password is not correct.",
  SIMILAR_PASSWORD: "The new password must be different from the old password.",
  EDIT_PROFILE_SUCCESS: "Profile updated successfully.",
  RISK_APPETITE_SUCCESS: "Risk appetite updated successfully.",
  TRADE_EXPERIENCE_SUCCESS: "Trade experience updated successfully.",
  NOTIFICATION_SETTINGS_SUCCESS: "Notification settings updated successfully.",
  EMAIL_ALREADY_REGISTERED:
    "Sign up failed. This email is already in use. Please log in instead.",
  SIGNUP_SUCCESS: "Sign up successful. Welcome aboard!",
  OTP_SEND_SUCCESS:
    "An OTP has been successfully sent to your registered mobile number.",
  OTP_INVALID: "Incorrect OTP. Please enter a valid OTP.",
  OTP_VERIFIED_SUCCESS: "OTP verification completed successfully.",
  RISK_TOLERANCE_SUCCESS: "Risk tolerance updated successfully.",
  USER_DETAILS_SUCCESS: "User details retrieved successfully",
  UPDATE_SETTING_SUCCESS: "Settings updated successfully",

  //admin

  //market crud api
  MARKET_DATA_SUCCESS: "Market data retrieved successfully",
  MARKET_DATA_NOT_FOUND: "Market data does not exist",
  MARKET_UPDATE_SUCCESS: "Market updated successfully",
  MARKET_ADD_SUCCESS: "Market added successfully",
  MARKET_NAME_EXIST: "Market name already exists. Please try a different name.",
  INVALID_CURRENT_PAGE:
    "Invalid current page. Please ensure that the provided page number does not exceed the total number of pages.",
  MARKET_DELETE_SUCCESS: "Market deleted successfully",

  //Assets api
  ASSET_DATA_SUCCESS: "Assets data retrieved successfully",
  ASSET_DATA_NOT_FOUND: "Asset data does not exist",
  ASSET_UPDATE_SUCCESS: "Asset updated successfully",
  ASSET_ADD_SUCCESS: "Asset added successfully",
  ASSET_NAME_EXIST: "Asset name already exists. Please try a different name.",
  ASSET_DELETE_SUCCESS: "Assets deleted successfully",
  ASSET_FIELD_MISSING:
    "Something went wrong. make sure that all fields are provided",
  ASSET_ALREADY_EXIST: "Asset already exists.",

  //Strategy api
  STRATEGY_DATA_SUCCESS: "Strategies data retrieved successfully",
  STRATEGY_DATA_NOT_FOUND: "Strategy data does not exist",
  STRATEGY_UPDATE_SUCCESS: "Strategy updated successfully",
  STRATEGY_ADD_SUCCESS: "Strategy added successfully",
  STRATEGY_NAME_EXIST:
    "Strategy name already exists. Please try a different name.",
  STRATEGY_DELETE_SUCCESS: "Requested strategies deleted successfully",
  STRATEGY_FIELD_MISSING:
    "Something went wrong. make sure that all fields are provided",
  STRATEGY_ALREADY_EXIST: "Strategy already exists.",
  STRATEGY_DATA_REGENERATE: "Strategy data regenerated successfully.",

  //stock api
  STOCK_SUCCESS: "Stock data retrieved successfully",

  //webhook
  WEBHOOK_FIELD_MISSING:
    "Something went wrong. please provide all necessary details",
  WEBHOOK_STRATEGY_NOT_FOUND: "Trade data does not exist",
  WEBHOOK_SUCCESS: "Completed successfully",
  LOW_BALANCE: "Low balance",
  LOW_LOT_SIZE: "Low quantity",
  INVALID_PYRAMIDING_STACK: "Invalid pyramiding stack",
  CANT_MAKE_SAME_DIRECTION_ORDER: "You can not execute same direction trades.",
  PYRAMIDING_STACK_REQUIRED: "Invalid pyramiding stack data.",

  //follow strategy
  FOLLOW_STRATEGY_FIELD_MISSING:
    "Something went wrong. please provide all necessary details",
  ALREADY_FOLLOWING_STRATEGY: "You're already followed this strategy.",
  FOLLOW_STRATEGY_SUCCESS: "Strategy followed successfully.",
  STRATEGY_NOT_FOLLOWED: "Strategy is not currently in your following list.",
  UNFOLLOW_STRATEGY_SUCCESS: "Strategy unfollowed successfully.",

  //open trade
  OPEN_TRADE_SUCCESS: "Open trade data retrieved successfully.",
  OPEN_TRADE_DATA_NOT_FOUND: "Open trade data does not exist.",

  //close trade
  CLOSE_TRADE_SUCCESS: "Close trade data retrieved successfully.",
  CLOSE_TRADE_DATA_NOT_FOUND: "Close trade data does not exist.",

  //NOTIFICATION
  NOTIFICATION_SUCCESS: "Notifications data retrieved successfully.",
  NOTIFICATION_DATA_NOT_FOUND: "Notifications data does not exist.",

  //Mark as read Notification
  NOTIFICATION_MARKED_AS_READ: "Notification cleared successfully",

  //Yahoo finance
  YAHOO_FINANCE_SUCCESS: "Yahoo finance data retrieved successfully.",

  //logout
  LOGOUT_SUCCESS: "Logout successfully.",

  //Google auth
  GOOGLE_SIGNUP_SUCCESS: "Successfully Signed-up using Google.",
  GOOGLE_SIGNUP_FAIL: "Google signed-up failed.",
  GOOGLE_LOGIN_SUCCESS: "Successfully Signed-in using Google.",

  //social login
  TRY_SOCIAL_LOGIN:
    "You are signed-up with Google. Please use Sign-In with google option.",

  //mongodb ID error
  INVALID_ID: "Invalid ID",

  //user data
  USER_SUCCESS: "User data retrieved successfully.",
  USER_UPDATE_SUCCESS: "User data updated successfully.",
  USER_NOT_FOUND: "User data does not exist.",
  USER_DELETE_SUCCESS: "User data deleted successfully.",
  NO_USER_AVAILABLE: "There is no user data available.",
  USER_EMAIL_ALREADY_EXISTS: "Email already exist. please try different email.",

  //mobile app api responses
  RISK_APPETITE_UPDATE_SUCCESS: "Risk appetite updated successfully",
  TRADE_EXPERIENCE_UPDATE_SUCCESS: "Trade experience updated successfully",
  NOTIFICATION_SETTINGS_UPDATE_SUCCESS:
    "Notification settings updated successfully",
};

//pagination
exports.PAGINATION = {
  DEFAULT_LIMIT: 10, //NUMBER OF ITEMS PER PAGE
  DEFAULT_PAGE: 1, // DEFAULT CURRENT PAGE FOR STARTING PAGINATION
};
