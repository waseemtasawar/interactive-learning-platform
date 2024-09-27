const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Install using npm install jsonwebtoken
const User = require("../models/users");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// SignUp Route
router.post("/signup", async (req, res) => {
  const { email, username, phoneNumber, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      email,
      username,
      phoneNumber,
      password,
      confirmPassword,
    });
    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { eamil, password } = req.body;

  try {
    let user = await User.findOne({ eamil });
    if (!user) {
      return res.status(404).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username,
      },
    };
    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token, msg: "Login Successfully" });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
