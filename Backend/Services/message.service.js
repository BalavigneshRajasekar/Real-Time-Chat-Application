const Message = require("../models/message.modal");

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
}

module.exports = new MessageService();
