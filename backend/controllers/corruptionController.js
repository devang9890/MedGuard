const { detectCorruption } = require("../services/corruptionService");

exports.getCorruptionInsights = async (req, res) => {
  try {
    const data = await detectCorruption();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
