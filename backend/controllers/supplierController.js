const Supplier = require("../models/Supplier");

// ADD SUPPLIER
exports.addSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL SUPPLIERS
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// VERIFY SUPPLIER
exports.verifySupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { verifiedStatus: true },
      { new: true }
    );
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// BLACKLIST SUPPLIER
exports.blacklistSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { blacklisted: true },
      { new: true }
    );
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
