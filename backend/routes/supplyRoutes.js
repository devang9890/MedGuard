const express = require("express");
const router = express.Router();
const { addSupply, getSupplies } = require("../controllers/supplyController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Pharmacist adds supply
router.post("/", protect, authorizeRoles("pharmacist", "admin"), addSupply);

// Admin/Inspector view
router.get("/", protect, authorizeRoles("admin", "inspector"), getSupplies);

module.exports = router;
