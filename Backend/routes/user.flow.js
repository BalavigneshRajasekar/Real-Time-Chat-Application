const express = require("express");
const userFlow = express.Router();
const AppFlow = require("../controller/userFlow.controller");
const authValidation = require("../middlewares/Authvalidation");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

// Importing required controllers

userFlow.post(
  "/addProfile",
  authValidation,
  upload.single("profile"),
  AppFlow.addProfile
);

module.exports = userFlow;
