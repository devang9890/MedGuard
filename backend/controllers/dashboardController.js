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
