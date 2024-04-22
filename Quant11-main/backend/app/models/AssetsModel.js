const mongoose = require("mongoose");

const AssetsSchema = new mongoose.Schema(
  {
    asset_name: {
      type: String,
    },
    asset_image: {
      type: String,
    },
    asset_image_url: {
      type: String,
    },
    market_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "market",
    },
    ticker_symbol: {
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
AssetsSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Custom method for soft delete
AssetsSchema.methods.softAssetDelete = async function () {
  this.deleted_at = new Date();
  await this.save();
};

const AssetsModel = mongoose.model("asset", AssetsSchema);

module.exports = AssetsModel;
