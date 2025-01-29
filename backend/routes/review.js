const express = require("express");
const router = express();
const { getVendors } = require("../controllers/review");

router.get("/vendors", getVendors);

module.exports = router;
