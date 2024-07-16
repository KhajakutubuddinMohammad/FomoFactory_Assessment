const express = require("express");
const stockRoutes = require("./routes/stockRoutes");
const connectDB = require("./db");
const cors = require("cors");
const {
  initializeWebSocket,
  addStock,
  removeStock,
} = require("./services/stockService");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`Sever started on port ${PORT}`);
});

app.use(express.json());
app.use("/api/stocks", stockRoutes);

const start = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully.");

    // Initialize WebSocket logic and wait until it's ready
    initializeWebSocket();
    console.log("WebSocket logic initialized.");

    // Ensure to call addStock and removeStock after WebSocket is ready
    // setTimeout(async () => {
    //   await addStock("AMZN"); // Add AMZN after 5 seconds
    // }, 5000);

    // setTimeout(async () => {
    //   await removeStock("AAPL"); // Remove AAPL after 10 seconds
    // }, 10000);
  } catch (error) {
    console.error(
      "Failed to connect to the database:",
      (error as Error).message
    );
    process.exit(1);
  }
};

start();
