//this file consists of functions related to db

const mongoose = require("mongoose");

// function to start database which is sent to server.js
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected");
  } catch (err) {
    console.log("mongodb connected failed", err);
    throw err;
  }
};

module.exports = { connectDatabase };
