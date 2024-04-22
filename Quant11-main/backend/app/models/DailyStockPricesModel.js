const mongoose = require("mongoose");

const DailyTradeSchema = new mongoose.Schema(
  {
    // strategy_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "strategy",
    // },
    asset_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "asset",
    },
    open_price: {
      type: Number,
    },
    close_price: {
      type: Number,
    },
    // open_time: {
    //   type: Date,
    //   default: null,
    // },
    // close_time: {
    //   type: Date,
    //   default: null,
    // },
    date: {
      type: String,
      default: null,
    },
    ticker_symbol: {
      type: String,
      default: null,
    },
    currency: {
      type: String,
      default: null,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

// Middleware to update `updatedAt ` field before saving
DailyTradeSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Custom method for soft delete
DailyTradeSchema.methods.softDailyTradeDelete = async function () {
  this.deleted_at = new Date();
  await this.save();
};

const DailyStockPricesModel = mongoose.model("daily_trade", DailyTradeSchema);

module.exports = DailyStockPricesModel;
