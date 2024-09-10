const express = require("express");
const postRouter = express.Router();
const postController = require("../controller/postController");

postRouter.get("/create", postController.createPostGet);
postRouter.post("/create", postController.createPostPost);

module.exports = postRouter;
