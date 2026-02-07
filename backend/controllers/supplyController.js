const Supply = require("../models/Supply");
const Alert = require("../models/Alert");
const { checkCompliance } = require("../services/complianceService");

// ADD SUPPLY
exports.addSupply = async (req, res) => {
  try {
    const complianceStatus = await checkCompliance(req.body);

    const supply = await Supply.create({
      ...req.body,
      complianceStatus
    });

    // AUTO ALERT GENERATION
    if (complianceStatus === "REJECT") {
      await Alert.create({
        type: "SUPPLY_REJECTED",
        message: "Supply rejected due to compliance failure",
        severity: "HIGH"
      });
    }

    if (complianceStatus === "WARNING") {
      await Alert.create({
        type: "SUPPLY_WARNING",
        message: "Supply requires manual inspection",
        severity: "MEDIUM"
      });
    }

    res.status(201).json({
      message: "Supply recorded",
      complianceStatus,
      supply
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL SUPPLIES
exports.getSupplies = async (req, res) => {
  try {
    const supplies = await Supply.find()
      .populate("medicineId")
      .populate("supplierId");

    res.json(supplies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
