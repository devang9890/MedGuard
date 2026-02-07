const express = require("express");
const router = express.Router();
const { 
  getDashboardStats,
  getNearExpirySupplies,
  getSupplierRisk,
  getComplianceTrend
} = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getDashboardStats);
router.get("/near-expiry", protect, getNearExpirySupplies);
router.get("/supplier-risk", protect, getSupplierRisk);
router.get("/compliance-trend", protect, getComplianceTrend);

module.exports = router;
