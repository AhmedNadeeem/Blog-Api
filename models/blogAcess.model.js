const { Schema, model } = require("mongoose");

const blogAccessSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "blog"
    },
    role: {
        type: String,
        enum: [ "admin", "editor" ]
    },
}, {
    timestamps: true
})

const BlogAccess = model("blog-access", blogAccessSchema);

module.exports = BlogAccess;