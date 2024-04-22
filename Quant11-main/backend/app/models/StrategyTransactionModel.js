const mongoose = require("mongoose");

const StrategiesTransactionSchema = new mongoose.Schema(
  {
    strategy_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "strategy",
    },
    trade_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "trade",
    },
    profit_loss: {
      type: Number,
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
StrategiesTransactionSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Custom method for soft delete
StrategiesTransactionSchema.methods.softStrategyTransactionDelete =
  async function () {
    this.deleted_at = new Date();
    await this.save();
  };

const StrategiesTransactionModel = mongoose.model(
  "strategy_transaction",
  StrategiesTransactionSchema
);

module.exports = StrategiesTransactionModel;
