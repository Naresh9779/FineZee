const serverless = require("serverless-http");
const app = require("../app");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const createAdminIfNotExists = require("../middleware/createAdmin");

dotenv.config();

let initialized = false;

const initApp = async () => {
  if (!initialized) {
    console.log("🚀 Initializing Vercel serverless...");
    await connectDB();
    await createAdminIfNotExists();
    initialized = true;
    console.log("✅ Initialization complete");
  }
};

module.exports = async (req, res) => {
  try {
    await initApp(); // ✅ runs only once per cold start
    return serverless(app)(req, res);
  } catch (err) {
    console.error("❌ Serverless init error:", err);
    return res.status(500).json({ message: "Server crash", error: err.message });
  }
};

