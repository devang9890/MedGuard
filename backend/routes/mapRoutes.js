const express = require("express");
const router = express.Router();
const { getMapData } = require("../controllers/mapController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getMapData);

module.exports = router;
