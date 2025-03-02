const userService = require("../Services/user.service");
const Utilities = require("../utils");
const resetTemplate = require("../Templates/resetCodeTemplate.js");

class ResetPassword {
  async generateResetCode(req, res) {
    const { email } = req.body;
    try {
      //Get User From DB
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      //Generate security code for reset password
      const code = Utilities.generateRandomString(5);
      //Add Dynamic values to template
      const template = resetTemplate
        .replace("{{username}}", user.username)
        .replace("{{code}}", code);
      //Send Email with code
      const msg = await Utilities.generateEmail(email, "Reset Code", template);
      console.log(msg);

      //Save security code in DB
      await userService.addResetCode(email, code);
      return res.status(200).json({ message: "Reset code sent" });
    } catch (e) {
      console.log(e);
      return res

        .status(500)
        .json({ message: e.message, error: "Server error" });
    }
  }
}

module.exports = new ResetPassword();
