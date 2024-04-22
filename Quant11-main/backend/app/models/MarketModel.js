const mongoose = require("mongoose");

const MarketSchema = new mongoose.Schema(
  {
    market_name: {
      type: String,
      required: true,
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
MarketSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Custom method for soft delete
MarketSchema.methods.softMarketDelete = async function () {
  this.deleted_at = new Date();
  await this.save();
};

const MarketModel = mongoose.model("market", MarketSchema);

module.exports = MarketModel;
