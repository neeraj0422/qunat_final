const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema(
  {
    strategy_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "strategy",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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
FollowSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Custom method for soft delete
FollowSchema.methods.softFollowDelete = async function () {
  this.deleted_at = new Date();
  await this.save();
};

const FollowModel = mongoose.model("follow", FollowSchema);

module.exports = FollowModel;
