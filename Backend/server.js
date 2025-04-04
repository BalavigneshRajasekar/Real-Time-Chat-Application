//Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception", err);
  console.error("Node process will now exit...");
});

const express = require("express");
const cookies = require("cookie-parser");
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
server.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://chathub-three-flax.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],

    // Allow all origins to connect to the server
  })
); //Handle Cors for entire app
server.use(cookies()); //Handle cookies
server.use(express.json()); //parse incoming payload
server.use(express.urlencoded({ extended: true })); // accept nested object and array value in form data

// Socket initialized with server
const io = socketIo(httpForSocket, {
  cors: {
    origin: ["http://localhost:5173", "https://chathub-three-flax.vercel.app"],
  },
});
// Socket connection entry point
mainSocket(io);

//Import Routes
const userAuthRoute = require("./routes/user.auth");
const userFlow = require("./routes/user.flow");
const messageRouter = require("./routes/message.route");

// Apply routes
server.use("/api/users", userAuthRoute);
server.use("/api/app", userFlow);
server.use("/api/message", messageRouter);

// Start the server on port 3000
httpForSocket.listen(3000, () => {
  console.log("Server is running on port 3000");
  createDbConnection(process.env.Mongo_URI); // create connection to MongoDB
});
