const express = require("express");
const authRouter = express.Router();
const userController = require("../controller/userController");

authRouter.get("/sign-up", userController.createUserGet);

authRouter.post("/sign-up", userController.createUserPost);

authRouter.get("/sign-in", userController.loginGet);

authRouter.post("/sign-in", userController.loginPost);

authRouter.post("/log-out", userController.logoutPost);

module.exports = authRouter;
