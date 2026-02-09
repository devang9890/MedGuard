const { getHospitalRiskMap } = require("../services/mapService");

exports.getMapData = async (req, res) => {
  try {
    const data = await getHospitalRiskMap();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
