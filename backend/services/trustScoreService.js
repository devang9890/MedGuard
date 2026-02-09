const Supplier = require("../models/Supplier");
const Supply = require("../models/Supply");

exports.calculateTrustScores = async () => {
  const suppliers = await Supplier.find();

  const results = [];

  for (const supplier of suppliers) {
    const totalSupplies = await Supply.countDocuments({
      supplierId: supplier._id
    });

    const rejected = await Supply.countDocuments({
      supplierId: supplier._id,
      complianceStatus: "REJECT"
    });

    const warnings = await Supply.countDocuments({
      supplierId: supplier._id,
      complianceStatus: "WARNING"
    });

    const expiryIssues = await Supply.countDocuments({
      supplierId: supplier._id,
      expiryDate: { $lt: new Date() }
    });

    if (totalSupplies === 0) {
      results.push({
        supplier: supplier.name,
        score: 100,
        label: "NEW"
      });
      continue;
    }

    const rejectedPercent = (rejected / totalSupplies) * 100;
    const warningPercent = (warnings / totalSupplies) * 100;

    let score =
      100 -
      rejectedPercent * 2 -
      warningPercent * 1 -
      expiryIssues * 5;

    score = Math.max(0, Math.round(score));

    let label = "SAFE";
    if (score < 50) label = "HIGH RISK";
    else if (score < 80) label = "MODERATE";

    results.push({
      supplierId: supplier._id,
      supplier: supplier.name,
      score,
      label,
      rejected,
      warnings,
      totalSupplies
    });
  }

  return results;
};
