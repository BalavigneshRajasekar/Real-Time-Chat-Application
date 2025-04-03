const bcrypt = require("bcryptjs");
const userService = require("../Services/user.service");
const Utilities = require("../utils");
const admin = require("../config/googleLogin");

// User Authentication Class
class UserAuth {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      const existingUser = await userService.getUser({ email: email });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      // Hash password before save
      const hashedPassword = await bcrypt.hash(
        password,
        bcrypt.genSaltSync(10)
      );
      const newUser = {
        username: username,
        email: email,
        password: hashedPassword,
      };
      await userService.createUser(newUser);
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
        user,
      });
    } catch (e) {
      res.status(500).json({ message: e.message, error: "server error" });
    }
  }
  async logout(req, res) {
    try {
      res.cookie("token", "", { expiresIn: 0 });
      res.json({ message: "User logged out successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message, error: "server error" });
    }
  }
  async verifyAuthUser(req, res) {
    try {
      const user = req.user;
      const authUsers = await userService.getUser({ email: user.email });
      if (!user) {
        throw new Error("User not authenticated");
      }
      res.status(200).json(authUsers);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "server error" });
    }
  }

  async googleLogin(req, res) {
    try {
      console.log("gLogin request get");

      const { tokenId } = req.body;
      const googleUser = await admin.auth().verifyIdToken(tokenId);
      const { email, picture, name } = googleUser;
      //Check user with this email already exists in the database
      let user = await userService.getUser({ email: email });

      if (!user) {
        //Create new user
        user = await userService.createUser({
          username: name,
          email: email,
          profilePic: picture,
        });
      }
      //Generate Log Token add to cookies
      Utilities.generateLogToken(user, res);
      res.json({
        message: "User logged in successfully",
        user: user,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message, error: "server error" });
    }
  }
}

module.exports = new UserAuth();
