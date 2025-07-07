const serverless = require("serverless-http");
const app = require("../app");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const createAdminIfNotExists = require("../middleware/createAdmin");

dotenv.config();

let serverlessHandler; // Cache the serverless handler
let initialized = false;

const initApp = async () => {
  if (!initialized) {
    console.log("🚀 Connecting to DB and preparing app...");
    await connectDB(); // Connect DB once
    await createAdminIfNotExists(); // One-time setup
    serverlessHandler = serverless(app); // Create handler once
    initialized = true;
    console.log("✅ Initialization complete");
  }
};

module.exports = async (req, res) => {
  await initApp();
  return serverlessHandler(req, res); // Use Express handler
};
