const { Schema, model } = require("mongoose");

const commentSchema = Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("comment", commentSchema)