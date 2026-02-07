const express = require("express");
const router = express.Router();
const {
  addSupplier,
  getSuppliers,
  verifySupplier,
  blacklistSupplier
} = require("../controllers/supplierController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Only admin can add suppliers
router.post("/", protect, authorizeRoles("admin"), addSupplier);

// Admin + inspector can view
router.get("/", protect, authorizeRoles("admin", "inspector"), getSuppliers);

// Admin verifies supplier
router.put("/verify/:id", protect, authorizeRoles("admin"), verifySupplier);

// Admin blacklist
router.put("/blacklist/:id", protect, authorizeRoles("admin"), blacklistSupplier);

module.exports = router;
