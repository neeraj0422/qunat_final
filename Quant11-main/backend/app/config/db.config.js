const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1);
  }
};

module.exports = {
  connectToDatabase,
};
