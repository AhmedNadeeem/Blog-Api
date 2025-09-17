const { Schema, SchemaTypes, model } = require("mongoose");

const postSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    author: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      required: true,
      trim: true,
    },
    likes: [
      {
        type: SchemaTypes.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        type: SchemaTypes.ObjectId,
        ref: "comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("post", postSchema);
