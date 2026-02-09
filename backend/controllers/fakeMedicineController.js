const { detectFakeMedicine } = require("../services/fakeMedicineService");

exports.checkFakeMedicine = async (req, res) => {
  try {
    const result = await detectFakeMedicine(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
