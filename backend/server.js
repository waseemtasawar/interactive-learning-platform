const express = require("express");
const connectDb = require("./db");
const app = express();
const authRoutes = require("./routes/auth");
const cors = require("cors");
require("dotenv").config();

// Connect to the database
connectDb();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Ensure this matches your frontend
    credentials: true,
    exposedHeaders: ["Authorization"], // Expose the authorization header
  })
);

// Middleware to parse JSON
app.use(express.json());

// Use for SignUp routes
app.use("/api/auth", authRoutes);

// Set the PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
