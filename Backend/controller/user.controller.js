const bcrypt = require("bcryptjs");
const userService = require("../Services/user.service");
const Utilities = require("../utils");

// User Authentication Class
class UserAuth {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      const existingUser = await userService.getUser({ email: email });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      await userService.createUser(username, email, password);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message, error: "server error" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.getUser({ email: email });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid email, please try again" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid password, please try again" });
      }
      //Generate Log Token add to cookies
      Utilities.generateLogToken(user, res);
      res.json({
        message: "User logged in successfully",
        userData: {
          userName: user.username,
          email: user.email,
          userId: user._id,
        },
      });
    } catch (e) {
      res.status(500).json({ message: e.message, error: "server error" });
    }
  }
}

module.exports = new UserAuth();
