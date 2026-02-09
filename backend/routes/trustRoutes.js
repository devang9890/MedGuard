const express = require("express");
const router = express.Router();
const { getTrustScores } = require("../controllers/trustController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getTrustScores);

module.exports = router;
