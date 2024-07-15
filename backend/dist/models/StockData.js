"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const stockDataSchema = new mongoose_1.Schema({
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)("StockData", stockDataSchema);
