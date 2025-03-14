const messageService = require("../Services/message.service");

class MessageController {
  async sendMessage(req, res) {
    const { receiverId } = req.params;
    const { chat } = req.body;
    const senderId = req.user.id;
    console.log(receiverId);

    try {
      if (!receiverId || !chat) {
        return res
          .status(400)
          .json({ message: "receiverId and chat are required" });
      }
      let newChat = {
        sender: senderId,
        receiver: receiverId,
        chat: chat,
      };
      await messageService.createMessage(newChat);
      res.status(201).json({ message: "message added" });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ message: e.message, error: "Server error" });
    }
  }

  async getMessages(req, res) {
    const { receiverId } = req.params;
    const senderId = req.user._id;
    try {
      if (!receiverId) {
        return res.status(400).json({ message: "receiverId is required" });
      }
      console.log(receiverId);
      console.log(senderId);

      const messages = await messageService.getMessages(senderId, receiverId);
      console.log(messages);

      res.status(200).json({ messages: messages });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ message: e.message, error: "server error" });
    }
  }

  async getAllMessages(req, res) {
    const senderId = req.user._id;
    try {
      const messages = await messageService.getAllMessages(senderId);
      res.status(200).json({ messages: messages });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ message: e.message, error: "Server error" });
    }
  }
}

module.exports = new MessageController();
