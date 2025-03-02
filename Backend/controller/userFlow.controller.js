const Utilities = require("../utils");
const userService = require("../Services/user.service");

class AppFLow {
  async addProfile(req, res) {
    const { displayName } = req.body;
    try {
      if (!displayName) {
        return res.status(400).json({ message: "Display name is required" });
      }
      // Get the user from the request
      const user = req.user;
      console.log(user.email);

      // Upload profile image to cloudinary
      const imageUrl = await Utilities.uploadImage(req);
      console.log(imageUrl);

      // Update this imageURL and Display name in DB
      console.log();

      await userService.findAndUpdateUser(user.email, {
        displayName: displayName,
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
}

module.exports = new AppFLow();
