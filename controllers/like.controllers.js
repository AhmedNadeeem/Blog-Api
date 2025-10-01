const User = require("../models/user.model");
const Post = require("../models/post.model");

const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userData = req.user;

    const user = await User.findById(userData.userId);
    if (!user)
      return res.status(400).json({ message: "User not registered", success: false });

    const post = await Post.findById(postId);
    if (!post)
      return res.status(400).json({ message: "Post not found", success: false });
    
    if(post.likes.includes(user._id))
      return res.status(400).json({ message: "You've already like this post", success: false });

    post.likes.push(user._id);
    post.save();

    return res.status(200).json({ message: "Post Liked", success: true });
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

    const post = await Post.findById(postId);
    if (!post)
      return res.status(400).json({ message: "Post not found", success: false });
    
    if(!post.likes.includes(user._id)) {
      return res.status(400).json({ message: "You haven't like this post", success: false });
    }

    post.likes = post.likes.filter(id => id.toString() !== user._id.toString() );
    await post.save();

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
