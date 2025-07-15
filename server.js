const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");
const createAdminIfNotExists = require("./middleware/createAdmin");

require("dotenv").config();

const port = 3000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    await createAdminIfNotExists();
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
