const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// Create Project
router.post("/", auth, async (req, res) => {

  // 🔐 Role check ADD KARNA HAI
  if (req.user.role !== "Admin") {
    return res.status(403).send("Only Admin can create project");
  }

  const { name, description } = req.body;

  const project = new Project({
    name,
    description,
    createdBy: req.user.id
  });

  await project.save();
  res.send("Project Created");
});

// Get all projects
router.get("/", auth, async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

module.exports = router;