const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// Create Task
router.post("/", auth, async (req, res) => {
  const { title, assignedTo, project } = req.body;

  const task = new Task({
    title,
    assignedTo,
    project
  });

  await task.save();
  res.send("Task Created");
});

// Get Tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find().populate("assignedTo project");
  res.json(tasks);
});

module.exports = router;