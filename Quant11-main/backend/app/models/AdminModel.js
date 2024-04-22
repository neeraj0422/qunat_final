const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    display_name: {
      type: String,
    },
    user_type: {
      type: String,
      default: "superadmin",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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
AdminSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const AdminModel = mongoose.model("admin", AdminSchema);

module.exports = AdminModel;
