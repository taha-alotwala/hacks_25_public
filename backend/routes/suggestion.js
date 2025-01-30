const {authMiddleware}  = require("../middleware/authentication"); 
const express = require("express");
const { getSuggestion } = require("../controllers/suggestions");
const router = express.Router();

router.get("/", authMiddleware, getSuggestion);

module.exports = router;
