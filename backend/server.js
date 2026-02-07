const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const supplyRoutes = require("./routes/supplyRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const alertRoutes = require("./routes/alertRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/supplies", supplyRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health check route
app.get("/", (req, res) => {
  res.status(200).send("🚀 MedGuard API running...");
});

// Test route (for Postman testing)
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working perfectly" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
