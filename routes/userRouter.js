const express = require("express");
const indexRouter = express.Router();
const postController = require("../controller/postController");

indexRouter.get("/", postController.getALLPosts);

module.exports = indexRouter;
