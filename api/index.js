const serverless = require("serverless-http");
const app = require("../app");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const createAdminIfNotExists = require("../middleware/createAdmin");

dotenv.config();

(async () => {
  await connectDB();
  await createAdminIfNotExists(); // ensure admin created in Vercel too
})();

module.exports = serverless(app);
