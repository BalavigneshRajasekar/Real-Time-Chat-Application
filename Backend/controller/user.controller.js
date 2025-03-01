const bcrypt = require("bcryptjs");
const userService = require("../Services/user.service");

// User Authentication Class
class UserAuth {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      const existingUser = await userService.getUserByEmail(email);

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(
        password,
        bcrypt.genSaltSync(10)
      );
      await userService.createUser(username, email, hashedPassword);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message, error: "server error" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.getUserByEmail(email);
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
      const token = await userService.generateLogToken(user);
      res.json({ message: "Logged in successfully", token });
    } catch (e) {
      res.status(500).json({ message: e.message, error: "server error" });
    }
  }
}

module.exports = new UserAuth();
