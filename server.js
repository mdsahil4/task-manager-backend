require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// Home route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// 🔥 FIX: Proper DB + PORT handling
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected ✅");

    const PORT = process.env.PORT; // ❗ IMPORTANT

    app.listen(PORT, "0.0.0.0", () => {
      console.log("Server running on port " + PORT);
    });
  })
  .catch(err => {
    console.log("DB Error ❌", err);
  });