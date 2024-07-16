const express = require("express");
const { Request, Response } = express;
const StockData = require("../models/StockData");

const getStockData = async (req: typeof Request, res: typeof Response) => {
  console.log(
    "-----------------------------------In backend getStockData API ---------------------------",
    req.params
  );
  try {
    const { symbol } = req.params;
    const data = await StockData.find({ symbol })
      .sort({ timestamp: -1 })
      .limit(20);
    res.status(200).json(data);
    console.log(data);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getStockData };
