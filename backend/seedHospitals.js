const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Hospital = require("./models/Hospital");

dotenv.config();

const seedHospitals = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const hospitals = [
      {
        name: "AIIMS Delhi",
        city: "Delhi",
        latitude: 28.5672,
        longitude: 77.21
      },
      {
        name: "Apollo Chennai",
        city: "Chennai",
        latitude: 13.0827,
        longitude: 80.2707
      },
      {
        name: "KEM Mumbai",
        city: "Mumbai",
        latitude: 19.076,
        longitude: 72.8777
      }
    ];

    const names = hospitals.map((hospital) => hospital.name);
    await Hospital.deleteMany({ name: { $in: names } });
    await Hospital.insertMany(hospitals);

    console.log("✅ Sample hospitals inserted");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedHospitals();
