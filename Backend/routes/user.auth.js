const express = require("express");
const userController = require("../controller/user.controller");

const userAuthRoute = express();

userAuthRoute.post("/auth/signup", userController.register);
userAuthRoute.post("/auth/login", userController.login);

userAuthRoute.post("/auth/resetPassword");
userAuthRoute.post("/auth/forgetPassword");

module.exports = userAuthRoute;
