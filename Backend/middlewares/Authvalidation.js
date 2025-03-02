const jwt = require("jsonwebtoken");
require("dotenv").config();

// middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);

  try {
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }
    const decoded = jwt.verify(token, process.env.LOG_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
