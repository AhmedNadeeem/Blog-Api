const { Router } = require("express");
const { getAllPosts, getSinglePost, createPosts, updatePosts, deletePosts } = require("../controllers/post.controllers");
const { verifyTokenMiddleware } = require("../middlewares/user.middlewares")
const verifyRoleMiddleware = require("../middlewares/role.middleware")

const postRouter = Router();

postRouter.get("/", verifyTokenMiddleware, getAllPosts);

postRouter.get("/:id", verifyTokenMiddleware, getSinglePost);

postRouter.post("/", verifyTokenMiddleware, createPosts);

postRouter.put("/:id", verifyTokenMiddleware, verifyRoleMiddleware, updatePosts);

postRouter.delete("/:id", verifyTokenMiddleware, verifyRoleMiddleware, deletePosts);

module.exports = postRouter;