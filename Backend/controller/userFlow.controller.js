const Utilities = require("../utils");

class AppFLow {
  async addProfile(req, res) {
    const { displayName } = req.body;
    console.log(displayName);
    try {
      // Get the user from the request
      const user = req.user;
      // Upload profile image to cloudinary
      const imageUrl = await Utilities.uploadImage(req);
      console.log(imageUrl);
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ message: e.message, error: "Server error" });
    }
  }
}

module.exports = new AppFLow();
