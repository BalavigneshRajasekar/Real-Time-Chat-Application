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
      await messageService.createMessage(senderId, receiverId, chat);
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
    const senderId = req.user.id;
    try {
      if (!receiverId) {
        return res.status(400).json({ message: "receiverId is required" });
      }
      const messages = await messageService.getMessages(senderId, receiverId);
      res.status(200).json({ messages: messages });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ message: e.message, error: "server error" });
    }
  }
}

module.exports = new MessageController();
