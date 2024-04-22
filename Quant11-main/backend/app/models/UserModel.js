const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    country: {
      type: String,
      default: null,
    },
    date_of_birth: {
      type: String,
      require: true,
    },
    country_code: {
      type: String,
      default: null,
    },
    mobile_number: {
      type: String,
      default: null,
    },
    otp: {
      type: String,
      default: null,
    },
    is_mobile_verified: {
      type: Number,
      default: 0,
    },
    is_email_verified: {
      type: Number,
      default: 0,
    },
    receive_newsletter: {
      type: Boolean,
      default: true,
    },
    receive_call_notification: {
      type: Boolean,
      default: true,
    },
    app_notification: {
      type: Boolean,
      default: true,
    },
    push_notification: {
      type: Boolean,
      default: true,
    },
    sms_notification: {
      type: Boolean,
      default: false,
    },
    email_notification: {
      type: Boolean,
      default: false,
    },
    is_sms_notification_allowed: {
      type: Boolean,
      default: false,
    },
    is_email_notification_allowed: {
      type: Boolean,
      default: false,
    },
    trade_experience: {
      type: Number,
      default: null,
    },
    risk_appetite: {
      type: Number,
      default: 1,
    },
    is_social_login: {
      type: Boolean,
      default: false,
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
UserSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Custom method for soft delete
UserSchema.methods.softUserDelete = async function () {
  this.deleted_at = new Date();
  await this.save();
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
