import nodemailer from "nodemailer";
import { _config } from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: _config.USER_EMAIL,
    clientId: _config.GOOGLE_CLIENT_ID,
    clientSecret: _config.GOOGLE_CLIENT_SECRET,
    refreshToken: _config.GOOGLE_REFRESH_TOKEN,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});


export default transporter