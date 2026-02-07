const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    type: String,
    message: String,
    severity: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", alertSchema);
