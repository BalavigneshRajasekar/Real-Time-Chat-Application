const User = require("../models/users.model");
const jwt = require("jsonwebtoken");

class UserServices {
  async getUserByEmail(email) {
    return await User.findOne({ email: email });
  }
  async createUser(username, email, password) {
    const newUser = await User.create({
      email: email,
      username: username,
      password: password,
    });
    await newUser.save();
    return newUser;
  }
  async generateLogToken(user) {
    const token = jwt.sign(
      {
        name: user.username,
        email: user.email,
        id: user._id,
      },
      process.env.LOG_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  }
}

module.exports = new UserServices();
