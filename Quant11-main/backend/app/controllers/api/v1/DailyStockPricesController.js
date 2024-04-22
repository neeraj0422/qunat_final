const moment = require("moment");
const { AssetsModel, DailyStockPricesModel } = require("../../../models");
const yahooFinance = require("yahoo-finance2").default;

const saveDailyStockPrices = async () => {
  try {
    const assets = await AssetsModel.find({ deleted_at: null });

    const tickerSymbols = assets.map((data) => `${data.ticker_symbol}`);

    await Promise.all(
      tickerSymbols.map(async (ticker) => {
        try {
          const yahooData = await yahooFinance.quoteSummary(ticker, {
            modules: ["price"],
          });

          const asset = await AssetsModel.findOne({
            ticker_symbol: ticker,
            deleted_at: null,
          });

          const storkPriceEntryDate = moment(yahooData.price.regularMarketTime)
            .utc()
            .format("YYYY-MM-DD");

          // Create a new data
          const newStockPrices = new DailyStockPricesModel({
            asset_id: asset._id,
            open_price: yahooData.price.regularMarketOpen.toFixed(2),
            close_price: yahooData.price.regularMarketPrice.toFixed(2),
            currency: yahooData.price.currency,
            date: storkPriceEntryDate,
            ticker_symbol: ticker,
          });

          await newStockPrices.save();
        } catch (error) {
          console.log(
            `Error processing stock prices data for ${ticker}:`,
            error
          );
        }
      })
    );
  } catch (error) {
    console.log("Error occured while storing Stocks prices data:", error);
  }
};

module.exports = { saveDailyStockPrices };
