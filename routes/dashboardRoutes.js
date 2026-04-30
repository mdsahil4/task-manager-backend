const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const total = await Task.countDocuments();
  const completed = await Task.countDocuments({ status: "Done" });
  const pending = await Task.countDocuments({ status: "Pending" });

  res.json({ total, completed, pending });
});

module.exports = router;