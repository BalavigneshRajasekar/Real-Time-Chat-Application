const User = require("../models/users.model");
const jwt = require("jsonwebtoken");

class UserServices {
  async getUser(query) {
    return await User.findOne(query);
  }
  async createUser(userData) {
    const newUser = await User.create(userData);
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
  async getAllUsersExceptSelf(req) {
    //When user login req.user attached user id so now we get except user
    const userId = req.user.id;
    return await User.find({ _id: { $ne: userId } });
  }
}

module.exports = new UserServices();
