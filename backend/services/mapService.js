const Hospital = require("../models/Hospital");
const Supply = require("../models/Supply");

exports.getHospitalRiskMap = async () => {
  const hospitals = await Hospital.find();

  const result = [];

  for (const hospital of hospitals) {
    const totalSupplies = await Supply.countDocuments();
    const rejected = await Supply.countDocuments({ complianceStatus: "REJECT" });

    const rejectionRate =
      totalSupplies === 0 ? 0 : (rejected / totalSupplies) * 100;

    let risk = "LOW";

    if (rejectionRate > 30) risk = "HIGH";
    else if (rejectionRate > 10) risk = "MEDIUM";

    result.push({
      hospital: hospital.name,
      city: hospital.city,
      lat: hospital.latitude,
      lng: hospital.longitude,
      risk
    });
  }

  return result;
};
