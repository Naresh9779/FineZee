// api/index.js
const app = require("../app");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const createAdminIfNotExists = require("../middleware/createAdmin");

dotenv.config();

let initialized = false;

(async () => {
  if (!initialized) {
    await connectDB();
    await createAdminIfNotExists();
    initialized = true;
    console.log("✅ App initialized on Vercel");
  }
})();

module.exports = app;
