const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const server = express();
const cors = require("cors");

const httpForSocket = http.createServer(server);
const io = socketIo(httpForSocket, {
  cors: {
    origin: "*",
  },
});
const manageUser = {};
io.on("connection", (socket) => {
  console.log("New client connected" + socket.id);

  socket.on("join", (userId) => {
    manageUser[userId] = socket.id;
    console.log("User has joined", manageUser);
  });

  socket.on("sendMessage", ({ userId, receiver, message }) => {
    const messages = { userId: userId, message: message };
    console.log(userId + ": " + message);
    const senderSocketId = manageUser[receiver]; // this has socket Id align with user ID
    console.log(senderSocketId);

    io.to(senderSocketId).emit("receive", messages);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

httpForSocket.listen(3000, () => {
  console.log("Server is running on port 3000");
});
