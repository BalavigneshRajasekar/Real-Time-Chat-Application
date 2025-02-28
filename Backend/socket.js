const mainSocket = (io) => {
  const manageUser = new Map();

  io.on("connection", (socket) => {
    console.log("New client connected" + socket.id);
    console.log(manageUser);

    socket.on("join", (userId) => {
      if (!manageUser.has(userId)) {
        manageUser.set(userId, new Set()); // create a new set for each new user user id
      }
      manageUser.get(userId).add(socket.id); // adding socket id to the user list
      console.log("User has joined", manageUser);
    });

    socket.on("sendMessage", ({ userId, receiver, message }) => {
      const messages = { userId: userId, message: message };
      const receiverSocketId = manageUser.get(receiver); // this has socket Id align with receiver ID
      const userSocketId = manageUser.get(userId); // this has socket Id align with user ID
      //If user has multiple open devices we need to send users own msg to him multiple open devices
      userSocketId.forEach((socketId) => {
        if (socket.id !== socketId) {
          io.to(socketId).emit("receive", messages);
        }
      });
      // If receiver has multiple open devices we need to send all open devices
      receiverSocketId.forEach((socketId) => {
        io.to(socketId).emit("receive", messages);
      });
    });

    // Verify user online status
    socket.on("verifyUser", (receiver) => {
      if (manageUser.has(receiver)) {
        console.log("online");
        console.log(socket.id);
        io.to(socket.id).emit("userOnline", true);
      } else {
        io.to(socket.id).emit("userOnline", false);
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
      io.to(socket.id).emit("userOnline", false);
      console.log(socket.id);
    });
  });
};

module.exports = mainSocket;
