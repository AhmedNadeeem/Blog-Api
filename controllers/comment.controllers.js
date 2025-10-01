const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");

const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const userData = req.user;
    const { commentText } = req.body;
    if (!commentText)
      return res
        .status(400)
        .json({ message: "Comment text required", success: false });
    console.log(commentText)
    console.log(typeof(commentText))

    const user = await User.findById(userData.userId);
    if (!user)
      return res
        .status(400)
        .json({ message: "User not registered", success: false });

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(400)
        .json({ message: "Post not found", success: false });

    const comment = await Comment.create({
      postId: post._id,
      userId: user._id,
      text: commentText,
    });

    post.comments.push(comment._id);
    post.save();

    return res.status(200).json({
      message: "Comment added",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to add comment",
      success: false,
      details: error.message,
    });
  }
};

const removeComment = async (req, res) => {
    try {
    const postId = req.params.id;
    const userData = req.user;
    const { commentId } = req.body;
    if (!commentId)
      return res
        .status(400)
        .json({ message: "Comment Id required", success: false });

    const user = await User.findById(userData.userId);
    if (!user)
      return res
        .status(400)
        .json({ message: "User not registered", success: false });

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(400)
        .json({ message: "Post not found", success: false });

    const comment = await Comment.findByIdAndDelete( commentId );
    console.log(comment);

    if(post.comments.includes(comment._id)) {
      post.comments = post.comments.filter(id => id.toString() !== comment._id.toString() );
      post.save();
    }

    return res.status(200).json({
      message: "Comment removed",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to remove comment",
      success: false,
      details: error.message,
    });
  }
};

module.exports = { addComment, removeComment };
