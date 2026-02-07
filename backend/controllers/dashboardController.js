const Supply = require("../models/Supply");
const Supplier = require("../models/Supplier");
const Alert = require("../models/Alert");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalSupplies = await Supply.countDocuments();

    const accepted = await Supply.countDocuments({ complianceStatus: "ACCEPT" });
    const warning = await Supply.countDocuments({ complianceStatus: "WARNING" });
    const rejected = await Supply.countDocuments({ complianceStatus: "REJECT" });

    const totalSuppliers = await Supplier.countDocuments();
    const blacklistedSuppliers = await Supplier.countDocuments({ blacklisted: true });

    const totalAlerts = await Alert.countDocuments();

    const complianceRate = totalSupplies
      ? ((accepted / totalSupplies) * 100).toFixed(2)
      : 0;

    res.json({
      totalSupplies,
      accepted,
      warning,
      rejected,
      complianceRate: `${complianceRate}%`,
      totalSuppliers,
      blacklistedSuppliers,
      totalAlerts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNearExpirySupplies = async (req, res) => {
  try {
    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    const nearExpiry = await Supply.find({
      expiryDate: { $gte: today, $lte: next30Days }
    }).populate("medicineId supplierId");

    res.json(nearExpiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSupplierRisk = async (req, res) => {
  try {
    const suppliers = await Supplier.find();

    const riskData = await Promise.all(
      suppliers.map(async (supplier) => {
        const rejectedSupplies = await Supply.countDocuments({
          supplierId: supplier._id,
          complianceStatus: "REJECT"
        });

        const warnings = await Supply.countDocuments({
          supplierId: supplier._id,
          complianceStatus: "WARNING"
        });

        const riskScore = rejectedSupplies * 2 + warnings;

        return {
          supplier: supplier.name,
          riskScore
        };
      })
    );

    res.json(riskData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComplianceTrend = async (req, res) => {
  try {
    const supplies = await Supply.aggregate([
      {
        $group: {
          _id: "$complianceStatus",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(supplies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
