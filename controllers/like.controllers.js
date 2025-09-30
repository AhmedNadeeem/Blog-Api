const User = require("../models/user.model");
const Post = require("../models/post.model");

const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userData = req.user;

    const user = await User.findById(userData.userId);
    if (!user)
      return res.status(400).json({ message: "User not registered", success: false });

    await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: user._id } },
      { new: true }
    );

    res.status(200).json({ message: "Post Liked", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Failed to like the post",
        success: false,
        details: error.message,
      });
  }
};

const dislikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userData = req.user;

    const user = await User.findById(userData.userId);
    if (!user)
      return res.status(400).json({ message: "User not registered", success: false });

    await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: user._id } },
      { new: true }
    );

    res.status(200).json({ message: "Post Disliked", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Failed to dislike the post",
        success: false,
        details: error.message,
      });
  }
};

module.exports = { likePost, dislikePost };
