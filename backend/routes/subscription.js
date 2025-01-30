const express = require("express");
const {
  createSubscription,
  getSubscriptions,
} = require("../controllers/subscription");
const router = express.Router();

router.route("/").post(createSubscription);
router.route("/:id").get(getSubscriptions);

module.exports = router;
