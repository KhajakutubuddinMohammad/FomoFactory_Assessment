"use strict";
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
// Load environment variables from config.env file
dotenv.config({ path: path.resolve(__dirname, "config.env") });
const connectDB = async () => {
    console.log("Connection String: ", process.env.MONGO_URI);
    const connString = "mongodb+srv://TestUser_Admin:Admin123@cluster0.xybkqm5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    try {
        await mongoose.connect(connString);
        console.log("MongoDB connected");
    }
    catch (err) {
        const error = err;
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};
module.exports = connectDB;
