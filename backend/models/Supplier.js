const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true
    },
    contactPerson: String,
    phone: String,
    email: String,

    verifiedStatus: {
      type: Boolean,
      default: false
    },

    rating: {
      type: Number,
      default: 0
    },

    blacklisted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplier", supplierSchema);
