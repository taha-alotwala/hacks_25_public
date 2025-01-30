const express = require("express");
const { getSuggestion } = require("../controllers/suggestions");
const router = express.Router();

router.get("/", getSuggestion);

module.exports = router;
