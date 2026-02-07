const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/admin-only", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin 👑",
    user: req.user
  });
});

router.get("/pharmacist", protect, authorizeRoles("pharmacist", "admin"), (req, res) => {
  res.json({
    message: "Pharmacist Access Granted 💊",
    user: req.user
  });
});

module.exports = router;
