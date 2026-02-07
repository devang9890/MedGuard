const express = require("express");
const router = express.Router();
const { addMedicine, getMedicines } = require("../controllers/medicineController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addMedicine);
router.get("/", protect, getMedicines);

module.exports = router;
