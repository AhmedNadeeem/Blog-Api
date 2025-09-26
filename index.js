const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users.routes");
const env = require("dotenv");

const app = express();

env.config();

mongoose.connect('mongodb://127.0.0.1:27017/blog-api')
.then(()=> console.log("Connected to DB"))
.catch((err)=> console.error(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users/", userRouter);

app.listen(8000, console.log("App is listening to posrt 8000."));