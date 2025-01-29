const express = require("express");
const {
  getProductListings,
  getProductsForVendor,
} = require("../controllers/user-products");
const { authMiddleware } = require("../middleware/authentication");

const router = express.Router();

router.get("/", authMiddleware, getProductListings);
router.get("/:id", authMiddleware, getProductsForVendor);

module.exports = router;
