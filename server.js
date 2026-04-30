require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Health check (सबसे ऊपर)
app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// ✅ Quick test
app.get("/test", (req, res) => {
  res.send("WORKING");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// ❗ Server पहले start करो
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});

// ❗ DB बाद में connect (block मत करो)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected ✅"))
  .catch(err => console.error("DB Error ❌", err));