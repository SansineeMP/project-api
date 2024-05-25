// routes/index.js
const express = require("express");
const router = express.Router();
const sumPrice = require("../controller/SumPriceController");

router.get("/total", sumPrice.getTotal);
router.get("/type", sumPrice.getType);


module.exports = router;
