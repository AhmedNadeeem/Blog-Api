const Post = require("../models/post.model");
const User = require("../models/user.model");
const BlogAccess = require("../models/blogAcess.model");

const grantAccess = async (req, res) => {
  try {
    const { postId, newUserId, accessRole } = req.body;
    const userData = req.user;
    if (!postId || !newUserId || !accessRole)
      return res
        .status(400)
        .json({
          message: "Post id, new user id, and access role is required",
          success: false,
        });

    const newUser = await User.findById(newUserId);
    if (!newUser)
      return res
        .status(400)
        .json({ message: "New user not registered", success: false });

    const user = await User.findById(userData.userId);
    if (!user)
      return res
        .status(400)
        .json({ message: "User not registered", success: false });

    const post = await Post.find({ author: user._id, postId: postId });
    if (!post)
      return res
        .status(400)
        .json({ message: "Post not found with this post id", success: false });

    const preAccess = await BlogAccess.findOne({
      userId: newUser._id,
      blogId: post._id,
    });
    console.log(preAccess)
    if (!preAccess) {
      const payload = {
        userId: newUser._id,
        blogId: post._id,
      };

      switch (accessRole) {
        case "admin":
          payload.role = "admin";
        case "editor":
          payload.role = "editor";
          break;
      }

      const newAccess = await BlogAccess.create(payload);
      console.log(newAccess);
      return res
        .status(200)
        .json({
          message: "Access granted",
          success: true,
          newAccess: newAccess,
        });
    } else {
      if (preAccess.role === accessRole) {
        return res
          .status(400)
          .json({ message: "User already has this access", success: false });
      } else if (preAccess.role !== accessRole) {
        preAccess.role = accessRole;
        await preAccess.save();
        return res.status(200).json({
            message: "Access changed",
            success: true,
            preAccess: preAccess,
          });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to grant access",
      success: false,
      details: error.message,
    });
  }
};

const removeAccess = async (req, res) => {
  try {
    const { postId, newUserId } = req.body;
    const userData = req.user;
    if (!postId || !newUserId)
      return res
        .status(400)
        .json({
          message: "Post id, new user id, and access role is required",
          success: false,
        });

    const newUser = await User.findById(newUserId);
    if (!newUser)
      return res
        .status(400)
        .json({ message: "New user not registered", success: false });

    const user = await User.findById(userData.userId);
    if (!user)
      return res
        .status(400)
        .json({ message: "User not registered", success: false });

    const post = await Post.find({ author: user._id, postId: postId });
    if (!post)
      return res
        .status(400)
        .json({ message: "Post not found with this post id", success: false });

    const payload = {
      userId: newUser._id,
      blogId: post._id,
    };

    const deleteAccess = await BlogAccess.findOneAndDelete(payload);
    console.log(deleteAccess);
    return res
      .status(200)
      .json({
        message: "Access removed",
        success: true,
        deletedAccess: deleteAccess,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to remove access",
      success: false,
      details: error.message,
    });
  }
};

module.exports = { grantAccess, removeAccess };
