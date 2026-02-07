const mongoose = require("mongoose");

const supplySchema = new mongoose.Schema(
  {
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true
    },
    batchNumber: {
      type: String,
      required: true
    },
    expiryDate: {
      type: Date,
      required: true
    },
    quantity: Number,
    temperature: Number,

    complianceStatus: {
      type: String,
      enum: ["ACCEPT", "WARNING", "REJECT"],
      default: "ACCEPT"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supply", supplySchema);
