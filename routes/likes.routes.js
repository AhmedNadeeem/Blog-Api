const { Router } = require("express");
const { verifyTokenMiddleware } = require("../middlewares/user.middlewares")
const { likePost, dislikePost } = require("../controllers/like.controllers")

const likeRouter = Router();

likeRouter.post("/like/:id", verifyTokenMiddleware, likePost);

likeRouter.delete("/dislike/:id", verifyTokenMiddleware, dislikePost);

module.exports = likeRouter;
