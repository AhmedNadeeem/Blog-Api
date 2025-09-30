const { Router } = require("express");
const { verifyTokenMiddleware } = require("../middlewares/user.middlewares");
const { addComment, removeComment } = require("../controllers/comment.controllers")

const commentRouter = Router();

commentRouter.post("/add/:id", verifyTokenMiddleware, addComment);

commentRouter.delete("/remove/:id", verifyTokenMiddleware, removeComment);

module.exports = commentRouter;