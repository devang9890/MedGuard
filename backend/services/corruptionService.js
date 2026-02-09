const Supply = require("../models/Supply");
const Supplier = require("../models/Supplier");

exports.detectCorruption = async () => {
  const suppliers = await Supplier.find();
  const insights = [];

  for (const supplier of suppliers) {
    const total = await Supply.countDocuments({ supplierId: supplier._id });

    if (total === 0) continue;

    const accepted = await Supply.countDocuments({
      supplierId: supplier._id,
      complianceStatus: "ACCEPT"
    });

    const rejected = await Supply.countDocuments({
      supplierId: supplier._id,
      complianceStatus: "REJECT"
    });

    const duplicateBatches = await Supply.aggregate([
      { $match: { supplierId: supplier._id } },
      { $group: { _id: "$batchNumber", count: { $sum: 1 } } },
      { $match: { count: { $gt: 2 } } }
    ]);

    let flags = [];

    const acceptanceRate = (accepted / total) * 100;

    if (acceptanceRate > 95)
      flags.push("Abnormally high approval rate");

    if (duplicateBatches.length > 0)
      flags.push("Repeated batch supply pattern");

    if (rejected > 3 && accepted > rejected)
      flags.push("Supplier accepted despite high rejection history");

    if (total > 20 && accepted / total > 0.6)
      flags.push("Possible supplier favoritism");

    if (flags.length > 0) {
      insights.push({
        supplier: supplier.name,
        totalSupplies: total,
        accepted,
        rejected,
        acceptanceRate: acceptanceRate.toFixed(2),
        flags
      });
    }
  }

  return insights;
};
