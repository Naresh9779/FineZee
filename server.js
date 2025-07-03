const express = require("express");
const mongoose = require("mongoose");
const app=require("./app");

require("dotenv").config();



const port = 3000;

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
