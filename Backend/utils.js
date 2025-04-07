const nodeMailer = require("nodemailer");
const userService = require("./Services/user.service");
const jwt = require("jsonwebtoken");
const cloudinary = require("./config");
const axios = require("axios");
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
      secure: true,
      sameSite: "none", // set to 'none' for cross-site requests
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

  //Upload a file to the cloudinary For Profile Images
  static async uploadImage(req) {
    let imageBuffer;
    //Handle image from form or multer
    if (req.file) {
      imageBuffer = req.file.buffer;
    }
    //handle Image from google ulr
    else if (typeof req == "string" && req.startsWith("https")) {
      const imageResponse = await axios.get(req, {
        responseType: "arraybuffer",
      });
      imageBuffer = Buffer.from(imageResponse.data);
      console.log("gogle image", imageBuffer);
    }
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
      result.end(imageBuffer);
    });
    return url.secure_url;
  }

  //Upload a Base64 url to cloudinary basically a chat Image
  static async uploadBase64(imgUrl) {
    try {
      if (imgUrl?.startsWith("data:image")) {
        const uploadImage = await cloudinary.uploader.upload(imgUrl, {
          folder: "chatImages",
        });
        return uploadImage.secure_url;
      }
      return null;
    } catch (e) {
      console.log(e);
      throw new Error("Error uploading image");
    }
  }
}

module.exports = Utilities;
