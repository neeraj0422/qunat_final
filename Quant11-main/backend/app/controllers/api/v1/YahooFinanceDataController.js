const { STATUS_CODES, STATUS_MESSAGES } = require("../../../config/constants");
const {
  getCommonErrorResponse,
  getCommonSuccessResponse,
} = require("../../../config/responseHandler.config");
const yahooFinance = require("yahoo-finance2").default;

const getYahooFinanceData = async (req, res) => {
  try {
    const { ticker_symbol } = req.body;

    const yahooData = await yahooFinance.quoteSummary(ticker_symbol, {
      modules: ["price"],
    });

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      yahooData,
      STATUS_MESSAGES.YAHOO_FINANCE_SUCCESS
    );

    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log("Error occurred while fetching yahoo finance data:", error);
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

const getYahooFinanceHistoricalData = async (req, res) => {
  try {
    const { ticker_symbol, start_date, end_date } = req.body;

    const query = ticker_symbol;
    const queryOptions = {
      period1: start_date, // YYYY-MM-DD
      period2: end_date,
      //   interval: "1d",
    };
    const historicalData = await yahooFinance.historical(query, queryOptions);

    const response = getCommonSuccessResponse(
      STATUS_CODES.SUCCESS,
      historicalData,
      STATUS_MESSAGES.YAHOO_FINANCE_SUCCESS
    );

    return res.status(STATUS_CODES.SUCCESS).json(response);
  } catch (error) {
    console.log(
      "Error occurred while fetching yahoo finance historical data:",
      error
    );
    const response = getCommonErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      null,
      error.message || error
    );
    return res.status(STATUS_CODES.SERVER_ERROR).json(response);
  }
};

module.exports = {
  getYahooFinanceData,
  getYahooFinanceHistoricalData,
};
