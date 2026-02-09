const Supply = require("../models/Supply");

exports.getUsagePriority = async () => {
  const today = new Date();

  const supplies = await Supply.find()
    .populate("medicineId")
    .populate("supplierId");

  const scored = supplies.map((s) => {
    const daysToExpiry = Math.ceil(
      (new Date(s.expiryDate) - today) / (1000 * 60 * 60 * 24)
    );

    // Base risk: closer expiry = higher priority
    let priorityScore = 0;
    if (daysToExpiry <= 0) priorityScore += 100;       // already expired
    else if (daysToExpiry <= 15) priorityScore += 60;
    else if (daysToExpiry <= 30) priorityScore += 40;
    else priorityScore += 10;

    // Large quantity → prioritize to reduce waste
    if (s.quantity >= 200) priorityScore += 20;
    else if (s.quantity >= 100) priorityScore += 10;

    // Compliance signals
    if (s.complianceStatus === "WARNING") priorityScore += 15;
    if (s.complianceStatus === "REJECT") priorityScore += 30;

    return {
      supplyId: s._id,
      medicine: s.medicineId?.name,
      supplier: s.supplierId?.name,
      batchNumber: s.batchNumber,
      expiryDate: s.expiryDate,
      daysToExpiry,
      quantity: s.quantity,
      complianceStatus: s.complianceStatus,
      priorityScore
    };
  });

  // Highest score = use first
  scored.sort((a, b) => b.priorityScore - a.priorityScore);

  return scored.slice(0, 10); // top 10 priority batches
};
