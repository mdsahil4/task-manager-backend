require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());

// 🔗 Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// 🔐 Middleware import
const auth = require("./middleware/auth");

// 🔒 Protected test route
app.get("/api/test", auth, (req, res) => {
  res.send("Protected route accessed ✅");
});

// 🏠 Home route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// 🔌 DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected ✅"))
  .catch(err => console.log(err));

// ✅ IMPORTANT FIX (Railway ke liye)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});