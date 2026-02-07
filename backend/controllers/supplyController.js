const Supply = require("../models/Supply");
const { checkCompliance } = require("../services/complianceService");

exports.addSupply = async (req, res) => {
  try {
    const complianceStatus = await checkCompliance(req.body);

    const supply = await Supply.create({
      ...req.body,
      complianceStatus
    });

    res.status(201).json({
      message: "Supply recorded",
      complianceStatus,
      supply
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSupplies = async (reqունակ, res) => {
  try {
    const supplies = await Supply.find()
      .populate("medicineId")
      .populate("supplierId");

    res.json(supplies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
