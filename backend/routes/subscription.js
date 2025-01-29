const express = require("express");
const router = express.Router();

router.route("/").post((req, res) => {
  res.json({ msg: "Create subscription" });
});

module.exports = router;
