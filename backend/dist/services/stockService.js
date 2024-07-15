"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAndStoreStockData = void 0;
const axios_1 = __importDefault(require("axios"));
const StockData_1 = __importDefault(require("../models/StockData"));
const fetchAndStoreStockData = async () => {
    try {
        const response = await axios_1.default.get("YOUR_API_ENDPOINT");
        const { symbol, price } = response.data;
        const stockData = new StockData_1.default({ symbol, price });
        await stockData.save();
    }
    catch (error) {
        const err = error;
        console.error("Error fetching or storing stock data:", err.message);
    }
};
exports.fetchAndStoreStockData = fetchAndStoreStockData;
