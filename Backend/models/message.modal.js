const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chat: {
      type: String,
    },
    image: {
      type: String,
      default: null,
    },
    read: {
      type: Boolean,
      default: false,
    },
    delivered: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, collection: "Message" }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
