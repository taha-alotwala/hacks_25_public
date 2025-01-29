const express = require("express");
const router = express();
const { getVendors, createReview } = require("../controllers/review");

router.get("/vendors", getVendors);
router.post("/", createReview);

module.exports = router;
