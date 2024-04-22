const mongoose = require("mongoose");

const StrategyTradesSchema = new mongoose.Schema(
  {
    strategy_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "strategy",
    },
    asset_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "asset",
    },
    secret_key: {
      type: String,
    },
    action: {
      type: String,
    },
    open_price: {
      type: Number,
    },
    close_price: {
      type: Number,
    },
    status: {
      type: String,
    },
    profit_loss: {
      type: Number,
    },
    lot_size: {
      type: Number,
    },
    open_time: {
      type: String,
      default: null,
    },
    close_time: {
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
StrategyTradesSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Custom method for soft delete
StrategyTradesSchema.methods.softTradeDelete = async function () {
  this.deleted_at = new Date();
  await this.save();
};

const StrategyTradesModel = mongoose.model(
  "strategy_trade",
  StrategyTradesSchema
);

module.exports = StrategyTradesModel;
