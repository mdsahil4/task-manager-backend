const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check existing user
    const existing = await User.findOne({ email });
    if (existing) return res.send("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
      role: role || "Member"   // 🔥 FIX (IMPORTANT)
    });

    await user.save();

    res.send("User Created");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.send("Wrong password");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;