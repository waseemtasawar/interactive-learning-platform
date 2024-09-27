const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your screct key";

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No Token , authorizatoion denied" });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is Not Valid" });
  }
};

module.exports = auth;
