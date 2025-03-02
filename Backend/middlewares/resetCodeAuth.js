const jwt = require("jsonwebtoken");
require("dotenv").config();

const resetCodeAuth = (req, res, next) => {
  const token = req.header("Authorization") || req.query.token;
  console.log("auth", token);

  try {
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }
    const decode = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    req.user = decode;
    next();
  } catch (e) {
    return res.status(400).json({ message: "Token Expired" });
  }
};

module.exports = resetCodeAuth;
