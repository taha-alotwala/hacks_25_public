const express = require("express");
const router = express();
const {
  getVendors,
  createReview,
  getReviewsForVendor,
} = require("../controllers/review");

router.get("/vendors", getVendors);
router.post("/", createReview);
router.get("/reviews/:id", getReviewsForVendor);

module.exports = router;
