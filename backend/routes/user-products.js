const express = require("express");
const {
  getProductListings,
  getProductsForVendor,
  getVendorLocations,
} = require("../controllers/user-products");
const { authMiddleware } = require("../middleware/authentication");

const router = express.Router();

router.get("/", authMiddleware, getProductListings);
router.get("/vendors/locations", authMiddleware, getVendorLocations);
router.get("/:id", authMiddleware, getProductsForVendor);

module.exports = router;
