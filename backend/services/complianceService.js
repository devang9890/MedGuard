const Supplier = require("../models/Supplier");
const Supply = require("../models/Supply");

exports.checkCompliance = async ({
  supplierId,
  expiryDate,
  temperature,
  batchNumber
}) => {
  let status = "ACCEPT";

  const supplier = await Supplier.findById(supplierId);

  // Rule 1 — Expired medicine
  if (new Date(expiryDate) < new Date()) {
    return "REJECT";
  }

  // Rule 2 — Blacklisted supplier
  if (supplier.blacklisted) {
    return "REJECT";
  }

  // Rule 3 — Supplier not verified
  if (!supplier.verifiedStatus) {
    status = "WARNING";
  }

  // Rule 4 — Temperature unsafe
  if (temperature > 8) {
    status = "WARNING";
  }

  // Rule 5 — Duplicate batch
  const duplicate = await Supply.findOne({ batchNumber });
  if (duplicate) {
    status = "WARNING";
  }

  return status;
};
