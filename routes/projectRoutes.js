const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// Create Project
router.post("/", auth, async (req, res) => {
  try {
    // 🔐 Role check
    if (req.user.role !== "Admin") {
      return res.status(403).send("Only Admin can create project");
    }

    const { name, description } = req.body;

    if (!name) {
      return res.status(400).send("Project name required");
    }

    const project = new Project({
      name,
      description,
      createdBy: req.user.id
    });

    await project.save();

    res.send("Project Created");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Get all projects
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;