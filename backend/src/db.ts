const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from config.env file
dotenv.config({ path: path.resolve(__dirname, "config.env") });

const connectDB = async () => {
  const connString = process.env.MONGO_URI;
  console.log(connString);
  try {
    await mongoose.connect(connString!);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", (err as Error).message);
    process.exit(1);
  }
};

module.exports = connectDB;
