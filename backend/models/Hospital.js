const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: String,
  city: String,
  latitude: Number,
  longitude: Number
});

module.exports = mongoose.model("Hospital", hospitalSchema);
