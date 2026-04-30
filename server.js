require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(cors());

// ✅ Test route (IMPORTANT - Railway check)
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ✅ Debug test route
app.get("/test", (req, res) => {
  res.send("WORKING ✅");
});

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// ❌ Error handler (taaki crash na ho)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server Error" });
});

// 🔥 DB + Server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected ✅");

    const PORT = process.env.PORT;

    app.listen(PORT, "0.0.0.0", () => {
      console.log("Server running on port " + PORT);
    });
  })
  .catch(err => {
    console.log("DB Error ❌", err);
  });