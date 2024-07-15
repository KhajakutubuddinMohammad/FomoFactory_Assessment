const express = require("express");
const { Request, Response } = express;
const StockData = require("../models/StockData");

// Define the getStockData function
const getStockData = async (req: typeof Request, res: typeof Response) => {
  console.log(
    "-----------------------------------In backend getStockData API ---------------------------",
    req.params
  );
  try {
    const { symbol } = req.params; // req.params should be properly typed now
    const data = await StockData.find({ symbol })
      .sort({ timestamp: -1 })
      .limit(20);
    res.status(200).json(data); // res.status should be properly typed now
    console.log(data);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

// const getAllStocksData = async (req: typeof Request, res: typeof Response) => {

// }

// Export the function
module.exports = { getStockData };
