const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const mainSocket = require("./socket");
const createDbConnection = require("./db.config");
require("dotenv").config();

// server connection
const server = express();
const httpForSocket = http.createServer(server);

//Built in middleware
server.use(cors()); //Handle Cors for entire app
server.use(express.json()); //parse incoming payload
server.use(express.urlencoded({ extended: true })); // accept nested object and array value in form data

// Socket initialized with server
const io = socketIo(httpForSocket, {
  cors: {
    origin: "*",
  },
});
// Socket connection entry point
mainSocket(io);

// Start the server on port 3000
httpForSocket.listen(3000, () => {
  console.log("Server is running on port 3000");
  createDbConnection(process.env.Mongo_URI); // create connection to MongoDB
});
