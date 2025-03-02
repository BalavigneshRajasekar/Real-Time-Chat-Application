const nodeMailer = require("nodemailer");
const userService = require("./Services/user.service");
require("dotenv").config();

// Utilities class for various utility functions
class Utilities {
  static generateRandomString(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  static generateEmail(to, subject, template) {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_MAIL, // Your email id
        pass: process.env.APP_PASSWORD, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL, // Sender's email
      to: to, // Recipient's email
      subject: subject, // Email subject
      html: template, // Email body in HTML
    };
    return transporter.sendMail(mailOptions);
  }
}

module.exports = Utilities;
