const { Router } = require("express");
const { getStockData } = require("../controllers/stockController");

const router = Router();

router.get("/:symbol", getStockData);

module.exports = router;
