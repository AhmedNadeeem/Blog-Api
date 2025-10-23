const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users.routes");
const postRouter = require("./routes/posts.routes");
const likeRouter = require("./routes/likes.routes");
const commentRouter = require("./routes/comments.routes");
const accessRouter = require("./routes/access.routes");
const env = require("dotenv");
const helmet = require("helmet");

const app = express();

env.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/blog-api")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.use("/api/users/", userRouter);
app.use("/api/posts/", postRouter);
app.use("/api/postlikes/", likeRouter);
app.use("/api/postComment/", commentRouter);
app.use("/api/postaccess/", accessRouter);

app.listen(8000, console.log("App is listening to posrt 8000."));
