const express = require("express");
const router = express.Router();
const { getPriority } = require("../controllers/usagePriorityController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getPriority);

module.exports = router;
