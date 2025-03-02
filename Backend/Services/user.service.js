const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UserServices {
  async getUserByEmail(email) {
    return await User.findOne({ email: email });
  }
  async createUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
    const newUser = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });
    await newUser.save();
    return newUser;
  }

  async addResetCode(email, code) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    user.resetCode = code;
    await user.save();
  }

  async generateLogToken(user, res) {
    const token = jwt.sign(
      {
        name: user.username,
        email: user.email,
        id: user._id,
      },
      process.env.LOG_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.Node_ENV !== "development",
      sameSite: "none", // set to 'none' for cross-site requests
      path: "/", // set to '/' for all routes
    });
  }
}

module.exports = new UserServices();
