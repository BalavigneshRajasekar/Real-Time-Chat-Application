const express = require("express");
const messageRouter = express.Router();
const authValidation = require("../middlewares/Authvalidation");
const messageController = require("../controller/message.controller");

messageRouter.post(
  "/add/newMessage/:receiverId",
  authValidation,
  messageController.sendMessage
);

messageRouter.get(
  "/get/messages/:receiverId",
  authValidation,
  messageController.getMessages
);

module.exports = messageRouter;
