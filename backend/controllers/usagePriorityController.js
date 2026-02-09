const { getUsagePriority } = require("../services/usagePriorityService");

exports.getPriority = async (req, res) => {
  try {
    const data = await getUsagePriority();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
