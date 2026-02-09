const express = require("express");
const router = express.Router();
const { checkFakeMedicine } = require("../controllers/fakeMedicineController");
const { protect } = require("../middleware/authMiddleware");

router.post("/scan", protect, checkFakeMedicine);

module.exports = router;
