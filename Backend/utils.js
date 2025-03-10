const nodeMailer = require("nodemailer");
const userService = require("./Services/user.service");
const jwt = require("jsonwebtoken");
const cloudinary = require("./config");
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
  static generateLogToken(user, res) {
    const token = jwt.sign(
      {
        username: user.username,
        profilePic: user.profilePic,
        email: user.email,
        _id: user._id,
      },
      process.env.LOG_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.Node_ENV !== "development",
      sameSite: "Strict", // set to 'none' for cross-site requests
      path: "/", // set to '/' for all routes
    });
  }
  static generateToken(user) {
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.username },
      process.env.RESET_TOKEN_SECRET,
      {
        expiresIn: "180s",
      }
    );
    return token;
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

  static async uploadImage(req) {
    const url = await new Promise((resolve, reject) => {
      const result = cloudinary.uploader.upload_stream(
        {
          folder: "profiles",
        },
        (error, result) => {
          if (error) reject(new Error(error));
          else resolve(result);
        }
      );
      result.end(req.file.buffer);
    });
    return url.secure_url;
  }
}

module.exports = Utilities;
