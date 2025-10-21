const Post = require("../models/post.model");
const BlogAccess = require("../models/blogAcess.model");
const User = require("../models/user.model");

const verifyRoleMiddleware = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userData = req.user;

    if (!postId)
      return res
        .status(400)
        .json({ message: "Post id requierd", success: false });

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(400)
        .json({ message: "Post not found with this id", success: false });

    const user = await User.findById(userData.userId);
    if (!user)
      return res
        .status(400)
        .json({ message: "User not found with this id", success: false });

    const userAccess = await BlogAccess.findOne({
      userId: user._id,
      blogId: post._id,
    });
    if (!userAccess)
      return res
        .status(400)
        .json({ message: "User access not found", success: false });

    if (userAccess.role == "admin") {
      return next();
    } else if (userAccess.role === "editor") {
      return next();
    } else if (post.author.toString() == user._id.toString()) {
      return next();
    } else {
      return res.status(400).json({
        message: "You are not eligible for this action",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to verify role",
      success: false,
      details: error.message,
    });
  }
};

module.exports = verifyRoleMiddleware;
