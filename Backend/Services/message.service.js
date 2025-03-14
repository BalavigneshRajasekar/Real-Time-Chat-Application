const Message = require("../models/message.modal");
const mongoose = require("mongoose");
class MessageService {
  async createMessage(dataObj) {
    const newMessage = await Message.create(dataObj);
    newMessage.save();
    return newMessage;
  }
  async getMessages(senderID, receiverID) {
    const messages = await Message.find({
      $or: [
        { senderID: senderID, receiverID: receiverID },
        { senderID: receiverID, receiverID: senderID },
      ],
    }).sort({ createdAt: 1 });
    return messages;
  }
  async getAllMessages(id) {
    //Convert Id string to mongo object
    const userId = new mongoose.Types.ObjectId(id);

    const chat = await Message.aggregate([
      { $match: { $or: [{ senderID: userId }, { receiverID: userId }] } },
      //Sort the chat by createdAt
      { $sort: { createdAt: 1 } },
      //Group all users chat like one on one chat whit this ID
      {
        $group: {
          _id: {
            $cond: [{ $eq: ["$senderID", userId] }, "$receiverID", "$senderID"],
          },
          lastMessage: { $last: "$$ROOT" }, // Get the latest message per conversation
          messages: { $push: "$$ROOT" }, // Store all messages per user
        },
      },
    ]);
    return chat;
  }
}

module.exports = new MessageService();
