const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("user", userSchema);
