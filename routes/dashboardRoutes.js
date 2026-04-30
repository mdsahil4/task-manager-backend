const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    res.json({
      total: 1,
      completed: 0,
      pending: 1
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard error" });
  }
});

module.exports = router;