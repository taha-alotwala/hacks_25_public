const express = require("express");
const { getProductListings } = require("../controllers/user-products");
const { authMiddleware } = require("../middleware/authentication");

const router = express.Router();

router.get("/product-listings", authMiddleware, getProductListings);

module.exports = router;
