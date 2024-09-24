const express = require("express");
const router = express.Router();

const User = require("../models/users");

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

module.exports = router;
