const { Schema, model } = require("mongoose");

const stockDataSchema = new Schema({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = model("StockData", stockDataSchema);
