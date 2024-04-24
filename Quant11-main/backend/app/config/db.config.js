const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://neeraj13031998:734Hw3bDvTJLNAqr@cluster0.0njduhw.mongodb.net/?retryWrites=true&w=majority', {
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
