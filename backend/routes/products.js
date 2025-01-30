const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
} = require("../controllers/products");
const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").patch(updateProduct);

module.exports = router;
