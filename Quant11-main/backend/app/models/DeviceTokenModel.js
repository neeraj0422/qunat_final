const mongoose = require("mongoose");

const DeviceTokenSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    device_token: {
      type: String,
    },
    type: {
      type: String,
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
DeviceTokenSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Custom method for soft delete
DeviceTokenSchema.methods.softDeviceTokenDelete = async function () {
  this.deleted_at = new Date();
  await this.save();
};

const DeviceTokenModel = mongoose.model("device_token", DeviceTokenSchema);

module.exports = DeviceTokenModel;
