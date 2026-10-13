// This file handles the connection to the database

const mongoose = require("mongoose");

// connectDB is a async funtion that attempts to connect to the database
// Called once at the start of the server
const connectDB = async () => {
  try {
    // mongoose.connect uses the uri from the .env file
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If the connection fails lets have something to catch the errors and log it for the user
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
