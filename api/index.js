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

const handler = async (event, context) => {
  await initApp();
  const serverlessHandler = serverless(app);
  return serverlessHandler(event, context);
};

module.exports.handler = handler;
