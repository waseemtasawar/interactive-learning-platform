const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("Authorization Header:", req.header("Authorization"));
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("Token received:", token);
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
