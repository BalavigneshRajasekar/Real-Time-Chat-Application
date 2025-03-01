const mongoose = require("mongoose");

const createDbConnection = async (URI) => {
  //Establish connection to MongoDB
  try {
    const connection = await mongoose.connect(URI);
    console.log("Connected to MongoDB");
    return connection;
  } catch (e) {
    console.error("Failed to connect to MongoDB");
    process.exit(1);
  }
};

module.exports = createDbConnection;
