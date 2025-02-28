const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const server = express();
const cors = require("cors");
const mainSocket = require("./socket");
const httpForSocket = http.createServer(server);

//Built iN middleware

server.use(cors());

// Socket initialized with server
const io = socketIo(httpForSocket, {
  cors: {
    origin: "*",
  },
});
mainSocket(io);

httpForSocket.listen(3000, () => {
  console.log("Server is running on port 3000");
});
