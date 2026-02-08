const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "pharmacist", "inspector"],
      default: "pharmacist"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Delete existing test user
    await User.deleteOne({ email: "test@medguard.com" });

    // Create new test user
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = await User.create({
      name: "Test Admin",
      email: "test@medguard.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("✅ Test user created successfully!");
    console.log("Email: test@medguard.com");
    console.log("Password: password123");
    console.log("Role: admin");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedUser();
