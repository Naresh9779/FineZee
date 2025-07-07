// api/index.js

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const createAdminIfNotExists = require("../middleware/createAdmin");

dotenv.config();

const app = express();

// Middleware and routes setup
app.use(express.json());
app.use("/api/university", require("../routes/universityRoutes"));

// Initialize once
(async () => {
  try {
    await connectDB();
    await createAdminIfNotExists();
    console.log("✅ DB Connected & Admin Setup Done");
  } catch (err) {
    console.error("❌ Init error:", err);
  }
})();

app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel!");
});

module.exports = app;
