const userService = require("../Services/user.service");
const Utilities = require("../utils");
const resetTemplate = require("../Templates/resetCodeTemplate.js");
const resetLinkTemplate = require("../Templates/resetLinkTemplate.js");
const bcrypt = require("bcryptjs");

class ResetPassword {
  async generateResetCode(req, res) {
    const { email } = req.body;
    try {
      //Get User From DB
      const user = await userService.getUser({ email: email });
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
      await Utilities.generateEmail(email, "Reset Code", template);

      //Save security code in DB
      await userService.addResetCode(email, code);
      //Code Expiry Token
      const token = Utilities.generateToken(user);
      return res.status(200).json({ message: "Reset code sent", token: token });
    } catch (e) {
      console.log(e);
      return res

        .status(500)
        .json({ message: e.message, error: "Server error" });
    }
  }

  async generateResetLink(req, res) {
    const { code } = req.body;
    try {
      if (code == undefined) {
        return res.status(400).json({ message: "Reset Code is required" });
      }

      const user = await userService.getUser({ resetCode: code });
      console.log("user", user);

      if (!user) {
        return res.status(404).json({ message: "Invalid Reset Code" });
      }
      //Generate Link expiry token
      const token = Utilities.generateToken(user);
      console.log("link", token);

      //Generate Reset Link Mail
      const urlForRestLink = `http://localhost:3000/api/users/forgotPassword/reset/?token=${token} && email=${user.email}`;
      const template = resetLinkTemplate.replace(
        "{{URL_FORM}}",
        urlForRestLink
      );
      //Send Email with Reset Link
      const msg = await Utilities.generateEmail(
        user.email,
        "Reset Link",
        template
      );

      return res.status(200).json({ message: "Reset Link sent" });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ message: e.message, error: "Server error" });
    }
  }

  async resetPassword(req, res) {
    const { password } = req.body;
    try {
      if (password === undefined) {
        return res.status(400).json({ message: "Password is required" });
      }
      //hash password before save
      const hashedPassword = await bcrypt.hash(
        password,
        bcrypt.genSaltSync(10)
      );
      // update pass word IN DB
      await userService.findAndUpdateUser(req.user.email, {
        password: hashedPassword,
        resetCode: null,
      });
      return res.status(200).json({ message: "Password reset successfully" });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ message: e.message, error: "Server error" });
    }
  }
}

module.exports = new ResetPassword();
