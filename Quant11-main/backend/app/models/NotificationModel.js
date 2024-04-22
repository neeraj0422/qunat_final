const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    strategy_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "strategy",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    asset_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "asset",
    },
    action: {
      type: String,
    },
    price: {
      type: Number,
    },
    is_read: {
        type: Number,
        default: 0,
    },
    time: {
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
NotificationSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Custom method for soft delete
NotificationSchema.methods.softNotificationDelete = async function () {
  this.deleted_at = new Date();
  await this.save();
};

const NotificationModel = mongoose.model("notification", NotificationSchema);

module.exports = NotificationModel;
