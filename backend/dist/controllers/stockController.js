"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStockData = void 0;
const StockData_1 = __importDefault(require("../models/StockData"));
const getStockData = async (req, res) => {
    try {
        const { symbol } = req.params;
        const data = await StockData_1.default.find({ symbol })
            .sort({ timestamp: -1 })
            .limit(20);
        res.json(data);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
};
exports.getStockData = getStockData;
