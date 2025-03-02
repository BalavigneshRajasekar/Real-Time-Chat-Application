const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UserServices {
  async getUser(query) {
    return await User.findOne(query);
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
  async findAndUpdateUser(query, updateDate) {
    const user = await User.findOneAndUpdate(
      { email: query },
      { $set: updateDate },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }
  }

  async addResetCode(email, code) {
    const user = await this.getUser({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    user.resetCode = code;
    await user.save();
  }
}

module.exports = new UserServices();
