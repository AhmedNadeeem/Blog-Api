const Post = require("../models/post.model");
const { postCreateValidation } = require("../utils/auth.joi")

const getAllPosts = async (req,res) => {
    try {
    const userData = req.user;

    const allPosts = await Post.find({ author: userData.userId });
    if(!allPosts) return res.status(400).json({ message: "No post found for this user", success: false });

    return res.status(200).json({ message: "Posts found", success: true, allPosts: allPosts });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Failed to get posts", success: false, details: error.message });
    }
}

const getSinglePost = async (req,res)=>{
    try {
        const postId = req.params.id;
        const userData = req.user;

        const post = await Post.findOne({ _id: postId, author: userData.userId });
        if(!post) return res.status(400).json({ message: "No post found for this id", success: false });

        return res.status(200).json({ message: "Post found", success: true, posts: post });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Failed to get posts", success: false, details: error.message });
    }
}

const createPosts = async (req,res)=>{
    try {
    const userData = req.user;
    const { error, value } = postCreateValidation(req.body);
    if (error) return res.status(400).json({ message: "Bad credentials", success: false, details: error });
    console.log(value);

    const newPost = await Post.create( { ...value, avatar: userData.userId } );
    if(!newPost) return res.status(400).json({ message: "Bad credentials", success: false });

     return res.status(201).json({ message: "Post created", success: true, post: newPost });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Failed to create posts", success: false, details: error.message });
    }
}

const updatePosts = async (req,res)=>{
    try {
        const postId = req.params.id;
        const userData = req.user;

        const {error, value} = postCreateValidation(req.body);
        if (error) return res.status(400).json({ message: "Bad credentials", success: false, details: error });
        console.log(value);

        const post = await Post.findByIdAndUpdate( { _id: postId }, { ...value, avatar: userData.userId });
        if(!post) return res.status(400).json({ message: "Bad credentials", success: false });

        return res.status(200).json({ message: "Post updated", success: true, post: post });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Failed to update posts", success: false, details: error.message });
    }
}

const deletePosts = async (req,res)=>{
    try {
        const postId = req.params.id;

        const deletePost = await Post.findByIdAndDelete(postId);
        if(!deletePost) return res.status(400).json({ message: "Bad credentials", success: false });

        return res.status(200).json({ message: "Post deleted", success: true, post: deletePost });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Failed to delete posts", success: false, details: error.message });
    }
}

module.exports = {
    getAllPosts,
    getSinglePost,
    createPosts,
    updatePosts,
    deletePosts
};
