const mongoose = require("mongoose");

const TradesSchema = new mongoose.Schema(
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
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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
      type: Date,
      default: null,
    },
    close_time: {
      type: Date,
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
TradesSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Custom method for soft delete
TradesSchema.methods.softTradeDelete = async function () {
  this.deleted_at = new Date();
  await this.save();
};

const TradesModel = mongoose.model("trade", TradesSchema);

module.exports = TradesModel;
