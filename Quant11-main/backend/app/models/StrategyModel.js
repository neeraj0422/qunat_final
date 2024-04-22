const mongoose = require("mongoose");

const StrategiesSchema = new mongoose.Schema(
  {
    strategy_name: {
      type: String,
    },
    asset_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "asset",
    },
    market_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "market",
    },
    secret_key: {
      type: String,
      unique: true,
    },
    strategy_id: {
      type: String,
      unique: true,
    },
    initial_balance: {
      type: Number,
      default: 0,
    },
    current_balance: {
      type: Number,
      default: 0,
    },
    pyramiding: {
      type: Boolean,
      default: false,
    },
    pyramiding_stack: {
      type: Number,
      default: 0,
    },
    inverse: {
      type: Boolean,
      default: false,
    },
    profit_factor: {
      type: Number,
      default: 0,
      required: true,
    },
    drawdown: {
      type: Number,
      default: 0,
      required: true,
    },
    profit_percentage: {
      type: Number,
      default: 0,
      required: true,
    },
    timeframe: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    stop_loss: {
      type: Number,
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

// Middleware to update `updatedAt` field before saving
StrategiesSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Custom method for soft delete
StrategiesSchema.methods.softStrategyDelete = async function () {
  this.deleted_at = new Date();
  await this.save();
};

const StrategyModel = mongoose.model("strategy", StrategiesSchema);

module.exports = StrategyModel;
