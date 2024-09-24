const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const registerUsers = new Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Please enter a valid email",
    ],
  },
  username: {
    type: String,
    required: [true, "UserName is required"],
    minlength: [8, "Username must be 8 character long"],
    maxlength: [50, "Username cannot exceed 50 character"],
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{11}$/, "Please enter a valid 10-digit phone number"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-Save hook to hash the password before saving

registerUsers.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  // Hash the password to pcrypt before saving
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// method that compare input password with hash password

registerUsers.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", registerUsers);
module.exports = User;
