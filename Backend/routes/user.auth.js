const express = require("express");
const userController = require("../controller/user.controller");
const resetPassword = require("../controller/resetPassword.controller");

const userAuthRoute = express();

userAuthRoute.post("/auth/signup", userController.register);
userAuthRoute.post("/auth/login", userController.login);
userAuthRoute.post(
  "/forgotPassword/resetCode",
  resetPassword.generateResetCode
);
userAuthRoute.post("/forgetPassword/resetLink");

module.exports = userAuthRoute;
