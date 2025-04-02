const Utilities = require("../utils");
const userService = require("../Services/user.service");

class AppFLow {
  async addProfile(req, res) {
    try {
      // Get the user from the request
      const user = req.user;
      // Upload profile image to cloudinary
      const imageUrl = await Utilities.uploadImage(req);
      // Update this imageURL and Display name in DB
      await userService.findAndUpdateUser(user.email, {
        profilePic: imageUrl,
      });
      return res.status(200).json({ message: "Profile updated successfully" });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ message: e.message, error: "Server error" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await userService.getAllUsersExceptSelf(req);
      return res.status(200).json(users);
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ message: e.message, error: "Server error" });
    }
  }
}

module.exports = new AppFLow();
