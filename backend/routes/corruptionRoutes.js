const express = require("express");
const router = express.Router();
const { getCorruptionInsights } = require("../controllers/corruptionController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getCorruptionInsights);

module.exports = router;
