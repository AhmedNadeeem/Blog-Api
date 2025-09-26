const { Router } = require("express");
const { getAllPosts, getSinglePost, createPosts, updatePosts, deletePosts } = require("../controllers/post.controllers");
const { verifyTokenMiddleware } = require("../middlewares/user.middlewares")

const postRouter = Router();

postRouter.get("/posts", verifyTokenMiddleware, getAllPosts);

postRouter.get("/posts/:id", verifyTokenMiddleware, getSinglePost);

postRouter.post("/posts", verifyTokenMiddleware, createPosts);

postRouter.put("/posts", verifyTokenMiddleware, updatePosts);

postRouter.delete("/posts/:id", verifyTokenMiddleware, deletePosts);

module.exports = postRouter;