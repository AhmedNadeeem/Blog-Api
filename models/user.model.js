const { Schema, model } = require("mongoose");
const { hashPass } = require("../utils/bcrypt.utils");

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

userSchema.pre("save", function(){
  const hashedPass = hashPass(this.password);
  this.password = hashedPass;
});

const User = model("user", userSchema);

module.exports = User;