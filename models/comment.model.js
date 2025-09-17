const { Schema, SchemaTypes, model } = require("mongoose");

const commentSchema = Schema(
  {
    postId: {
      type: SchemaTypes.ObjectId,
      ref: "post",
      required: true,
    },
    userId: {
      type: SchemaTypes.ObjectId,
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