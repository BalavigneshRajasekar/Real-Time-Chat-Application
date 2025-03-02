const express = require("express");
const userController = require("../controller/user.controller");
const resetPassword = require("../controller/resetPassword.controller");
const resetAuthMiddleware = require("../middlewares/resetCodeAuth.js");

const userAuthRoute = express();

userAuthRoute.post("/auth/signup", userController.register);
userAuthRoute.post("/auth/login", userController.login);
userAuthRoute.post(
  "/forgetPassword/resetCode",
  resetPassword.generateResetCode
);
userAuthRoute.post(
  "/forgetPassword/resetLink",
  resetAuthMiddleware,
  resetPassword.generateResetLink
);
userAuthRoute.post(
  "/forgetPassword/reset",
  resetAuthMiddleware,
  resetPassword.resetPassword
);

module.exports = userAuthRoute;
