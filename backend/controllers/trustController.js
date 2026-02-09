const { calculateTrustScores } = require("../services/trustScoreService");

exports.getTrustScores = async (req, res) => {
  try {
    const scores = await calculateTrustScores();
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
