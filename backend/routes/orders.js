const express = require("express");
const { getAllOrders, createOrder } = require("../controllers/orders");
const router = express.Router();

router.route("/").get(getAllOrders).post(createOrder);

module.exports = router;
