const Supply = require("../models/Supply");
const Medicine = require("../models/Medicine");

exports.detectFakeMedicine = async ({ batchNumber, medicineId, supplierId }) => {
  // Check duplicate batch across suppliers
  const duplicates = await Supply.find({ batchNumber });

  if (duplicates.length > 1) {
    const differentSupplier = duplicates.some(
      (s) => s.supplierId.toString() !== supplierId
    );

    if (differentSupplier) {
      return {
        status: "FAKE",
        reason: "Same batch supplied by multiple suppliers"
      };
    }
  }

  // Check unknown medicine
  const medicine = await Medicine.findById(medicineId);
  if (!medicine) {
    return {
      status: "SUSPICIOUS",
      reason: "Unknown medicine entry"
    };
  }

  return {
    status: "AUTHENTIC",
    reason: "No anomalies detected"
  };
};
