const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Replace these with your Cloudinary account details
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});
module.exports = cloudinary;
