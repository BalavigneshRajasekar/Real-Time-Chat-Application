const messageService = require("./Services/message.service");
const Utilities = require("./utils");

const mainSocket = (io) => {
  const manageUser = new Map();

  io.on("connection", (socket) => {
    console.log("New client connected" + socket.id);

    socket.on("join", (userId) => {
      if (!manageUser.has(userId)) {
        manageUser.set(userId, new Set()); // create a new set for each new user user id
      }
      manageUser.get(userId).add(socket.id); // adding socket id to the user list
      console.log("User has joined", manageUser);
      //Once user has joined online data share to all joiners
      io.emit("onlineUsers", Array.from(manageUser.keys()));
    });

    socket.on(
      "sendMessage",
      async ({ userId, receiver, text, img, createdAt, delivered }) => {
        let imgUrl = img;
        const newMessages = {
          senderID: userId,
          receiverID: receiver,
          chat: text,
          image: imgUrl,
          delivered: delivered,
          read: false,
          createdAt: createdAt,
        };
        const receiverSocketId = manageUser.get(receiver); // this has socket Id align with receiver ID
        const userSocketId = manageUser.get(userId); // this has socket Id align with user ID
        //If user has multiple open devices we need to send users own msg to him multiple open devices
        userSocketId?.forEach((socketId) => {
          if (socket.id !== socketId) {
            io.to(socketId).emit("receive", newMessages);
          }
        });

        // First verify user is joined the chat if not there is no socket ID for the user
        // if not we need to save the msg as not delivered
        if (receiverSocketId) {
          // If receiver has multiple open devices we need to send all open devices
          receiverSocketId.forEach((socketId) => {
            io.to(socketId).emit("receive", newMessages);
          });
          // Upload Image to cloudinary
          imgUrl = await Utilities.uploadBase64(img);
          newMessages.image = imgUrl;
          // Save Messages to DB
          try {
            await messageService.createMessage(newMessages);
          } catch (e) {
            console.log("Error while saving message", e);
          }
        }
        //If user not logged in then save as not delivered
        else {
          // Upload Image to cloudinary
          imgUrl = await Utilities.uploadBase64(img);
          newMessages.image = imgUrl;
          // Save Messages to DB as not delivered
          newMessages.delivered = false;
          try {
            await messageService.createMessage(newMessages);
          } catch (e) {
            console.log("Error while saving message", e);
          }
        }
      }
    );

    // Listen for read event from client
    //Change senders message to read:true
    socket.on("read", async ({ senderID, receiverID }) => {
      //Contains the same {sender and receiver} chat for seen updates
      const updateQueue = new Map();
      let key = `${senderID}-${receiverID}`;
      console.log("Read event received", senderID, receiverID);
      //Update read as true in DB for a sender Who send message to user
      //Use Debounce To cutout each DB updation by same chat users
      //collect same chats and update one time at the end of the delay
      if (!updateQueue.has(key)) {
        updateQueue.set(
          key,
          setTimeout(async () => {
            await messageService.updateMessageSeen(senderID, receiverID);
            const readMessages = manageUser.get(senderID);

            if (readMessages) {
              readMessages.forEach((socketId) => {
                io.to(socketId).emit("messageRead", { senderID, receiverID });
              });
            }
            updateQueue.delete(key);
          }, 1000)
        );
      }
    });

    // Listen for typing event from client
    socket.on("listenTyping", (receiverID, userId) => {
      console.log(receiverID);

      if (manageUser.has(receiverID)) {
        manageUser.get(receiverID).forEach((receiverSocket) => {
          io.to(receiverSocket).emit("typing", userId);
        });
      }
    });

    socket.on("stopTyping", (receiverID) => {
      if (manageUser.has(receiverID)) {
        manageUser.get(receiverID).forEach((receiverSocket) => {
          io.to(receiverSocket).emit("typing", null);
        });
      }
    });

    // Remove user from the list when the client disconnects
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      manageUser.forEach((sockets, userId) => {
        sockets.delete(socket.id);
        if (sockets.size == 0) {
          manageUser.delete(userId);
        }
      });
      //Once user has disconnected update the online user data
      io.emit("onlineUsers", Array.from(manageUser.keys()));
    });
  });
};

module.exports = mainSocket;
