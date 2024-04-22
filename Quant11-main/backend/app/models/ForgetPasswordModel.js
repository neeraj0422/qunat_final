const mongoose = require("mongoose");

const ForgetPasswordSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
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
ForgetPasswordSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const ForgetPasswordModel = mongoose.model(
  "forgetpassword",
  ForgetPasswordSchema
);

module.exports = ForgetPasswordModel;
