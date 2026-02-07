const express = require("express");
const router = express.Router();
const Alert = require("../models/Alert");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {
  const alerts = await Alert.find().sort({ createdAt: -1 });
  res.json(alerts);
});

module.exports = router;
