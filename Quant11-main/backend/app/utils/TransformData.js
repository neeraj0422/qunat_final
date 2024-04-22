const moment = require("moment");

const transformMarketData = (market) => ({
  _id: market._id,
  market_name: market.market_name,
  createdAt: market.createdAt,
  updatedAt: market.updatedAt,
});

const transformedAssetsData = (asset) => ({
  _id: asset._id,
  asset_name: asset.asset_name,
  // asset_image: asset.asset_image,
  // asset_image_url: asset.asset_image_url,
  market_id: asset.market_id._id,
  market_name: asset.market_id.market_name,
  ticker_symbol: asset.ticker_symbol,
  change_value: 0,
  price: 0,
  currency_symbol: "",
  createdAt: asset.createdAt,
  updatedAt: asset.updatedAt,
});
const transformedAssetsWithLimitedFields = (asset) => ({
  _id: asset._id,
  asset_name: asset.asset_name,
  ticker_symbol: asset.ticker_symbol,
  // asset_image: asset.asset_image,
  // asset_image_url: asset.asset_image_url,
  market_id: asset.market_id,
  createdAt: asset.createdAt,
  updatedAt: asset.updatedAt,
});

const transformedStrategyData = (strategy) => ({
  _id: strategy._id,
  strategy_name: strategy.strategy_name,
  asset_id: strategy.asset_id._id,
  asset_name: strategy.asset_id.asset_name,
  ticker_symbol: strategy.asset_id.ticker_symbol,
  market_id: strategy.market_id._id,
  market_name: strategy.market_id.market_name,
  initial_balance: strategy.initial_balance,
  current_balance: strategy.current_balance || 0,
  pyramiding: strategy.pyramiding,
  pyramiding_stack: strategy.pyramiding_stack,
  inverse: strategy.inverse,
  profit_factor: strategy.profit_factor,
  drawdown: strategy.drawdown,
  profit_percentage: strategy.profit_percentage,
  timeframe: strategy.timeframe,
  // secret_key: strategy.secret_key,
  // strategy_id: strategy.strategy_id,
  currency: strategy.currency,
  stop_loss: strategy.stop_loss,
  createdAt: strategy.createdAt,
  updatedAt: strategy.updatedAt,
});

const transformedAdminStrategyData = (strategy) => ({
  _id: strategy._id,
  strategy_name: strategy.strategy_name,
  asset_id: strategy.asset_id._id,
  asset_name: strategy.asset_id.asset_name,
  ticker_symbol: strategy.asset_id.ticker_symbol,
  market_id: strategy.market_id._id,
  market_name: strategy.market_id.market_name,
  initial_balance: strategy.initial_balance,
  current_balance: strategy.current_balance || 0,
  pyramiding: strategy.pyramiding,
  pyramiding_stack: strategy.pyramiding_stack,
  inverse: strategy.inverse,
  profit_factor: strategy.profit_factor,
  drawdown: strategy.drawdown,
  profit_percentage: strategy.profit_percentage,
  timeframe: strategy.timeframe,
  secret_key: strategy.secret_key,
  strategy_id: strategy.strategy_id,
  currency: strategy.currency,
  stop_loss: strategy.stop_loss,
  createdAt: strategy.createdAt,
  updatedAt: strategy.updatedAt,
});

const transformedStrategyWithLimitedFields = (strategy) => ({
  _id: strategy._id,
  strategy_name: strategy.strategy_name,
  asset_id: strategy.asset_id,
  market_id: strategy.market_id,
  budget: strategy.budget,
  profit_factor: strategy.profit_factor,
  drawdown: strategy.drawdown,
  profit_percentage: strategy.profit_percentage,
  timeframe: strategy.timeframe,
  // secret_key: strategy.secret_key,
  // strategy_id: strategy.strategy_id,
  createdAt: strategy.createdAt,
  updatedAt: strategy.updatedAt,
});

const transformedOpenTrade = (openTrade) => ({
  _id: openTrade._id,
  open_time: openTrade.open_time,
  close_time: openTrade.close_time,
  close_price: openTrade.close_price,
  strategy_id: openTrade.strategy_id,
  asset_id: openTrade.asset_id._id,
  asset_name: openTrade.asset_id.asset_name,
  ticker_symbol: openTrade.asset_id.ticker_symbol,
  action: openTrade.action,
  open_price: openTrade.open_price,
  status: openTrade.status,
  profit_loss: openTrade.profit_loss,
  lot_size: openTrade.lot_size,
  createdAt: openTrade.createdAt,
  updatedAt: openTrade.updatedAt,
});

const transformedCloseTrade = (closeTrade) => ({
  _id: closeTrade._id,
  close_time: closeTrade.close_time,
  open_time: closeTrade.open_time,
  open_price: closeTrade.open_price,
  strategy_id: closeTrade.strategy_id,
  asset_id: closeTrade.asset_id._id,
  asset_name: closeTrade.asset_id.asset_name,
  ticker_symbol: closeTrade.asset_id.ticker_symbol,
  action: closeTrade.action,
  close_price: closeTrade.close_price,
  status: closeTrade.status,
  profit_loss: closeTrade.profit_loss,
  lot_size: closeTrade.lot_size,
  createdAt: closeTrade.createdAt,
  updatedAt: closeTrade.updatedAt,
});

const transformedNotification = (notification) => ({
  _id: notification._id,
  time: notification.time,
  strategy_id: notification.strategy_id._id,
  strategy_name: notification.strategy_id.strategy_name,
  asset_id: notification.asset_id._id,
  asset_name: notification.asset_id.asset_name,
  ticker_symbol: notification.asset_id.ticker_symbol,
  // asset_image_url: notification.asset_id.asset_image_url,
  action: notification.action,
  price: notification.price,
  createdAt: notification.createdAt,
  updatedAt: notification.updatedAt,
});

const boolToString = ["False", "True"];
const riskAppetiteNumToString = ["Low Risk", "Medium Risk", "High Risk"];
const tradeExperienceNumToString = [
  "Less than 1 year",
  "1-3 year",
  "3-5 year",
  "5-10 year",
  "10-20 year",
  "More than 20 year",
];
const createdDateConvertor = (date) => {
  return moment(date).local().format("YYYY/MM/DD  HH:mm:ss");
};
const DobDateConvertor = (date) => {
  return moment(date, "DD/MM/YYYY").format("YYYY/MM/DD");
};

const transformedUserData = (user) => ({
  _id: user._id,
  first_name: user.first_name,
  last_name: user.last_name,
  email: user.email,
  country: user.country,
  date_of_birth: user.date_of_birth
    ? DobDateConvertor(user.date_of_birth)
    : "-",
  country_code: user.country_code,
  mobile_number: user.mobile_number,
  otp: user.otp ? user.otp : "-",
  is_mobile_verified: boolToString[user.is_mobile_verified],
  is_email_verified: boolToString[user.is_email_verified],
  receive_newsletter: user.receive_newsletter,
  receive_call_notification: user.receive_call_notification,
  app_notification: user.app_notification,
  push_notification: user.push_notification,
  email_notification: user.email_notification,
  is_sms_notification_allowed: user.sms_notification,
  is_sms_notification_allowed: user.is_sms_notification_allowed,
  is_email_notification_allowed: user.is_email_notification_allowed,
  trade_experience: tradeExperienceNumToString[user.trade_experience - 1]
    ? tradeExperienceNumToString[user.trade_experience - 1]
    : "-",
  risk_appetite: riskAppetiteNumToString[user.risk_appetite - 1]
    ? riskAppetiteNumToString[user.risk_appetite - 1]
    : "-",
  is_social_login: user.is_social_login,
  createdAt: createdDateConvertor(user.createdAt),
  updatedAt: user.updatedAt,
});

module.exports = {
  transformMarketData,
  transformedAssetsData,
  transformedStrategyData,
  transformedAdminStrategyData,
  transformedAssetsWithLimitedFields,
  transformedStrategyWithLimitedFields,
  transformedOpenTrade,
  transformedCloseTrade,
  transformedNotification,
  transformedUserData,
};
