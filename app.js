const express = require("express");
const university = require("./routes/universityRoutes");
const student = require("./routes/studentRoutes");
const admin = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("🚀 Fine-Zee API is live");
});

app.use("/api/university", university);
app.use("/api/student", student);
app.use("/api/admin", admin);

module.exports = app;
