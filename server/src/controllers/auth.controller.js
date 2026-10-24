import userModel from "../models/user.model.js";
import AppError from "../utils/app.error.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/emailMessage.js";
import verificationEmailTemplate from "../utils/emailTemplates.js";
import jwt from "jsonwebtoken";
import { _config } from "../config/config.js";

const userRegisterController = async (req, res) => {
  console.log("running")
  const { UserName, Email, Password, PhoneNo } = req.body;
  console.log(UserName, Email, Password, PhoneNo )

  const isEmailAlreadyExists = await userModel.findOne({ Email });

  if (isEmailAlreadyExists) {
    throw new AppError("This email is already used", 401);
  }

  const hashPassword = await bcrypt.hash(Password, 12);

  const OTP = Math.floor(1000 + Math.random() * 9000);

  await userModel.create({
    UserName,
    Email,
    Password: hashPassword,
    PhoneNo,
    EmailOTP: OTP,
  });

  await sendEmail(
    Email,
    "Verify Your Email Address | ProVity",
    `Hi ${UserName}, your verification code is ${OTP}. It expires in 5 minutes.`,
    verificationEmailTemplate(UserName, OTP),
  );

  return res.status(201).json({
    success: true,
    message: "Registration successful. Please verify your email.",
  });
};

const emailVerifictionController = async (req, res) => {
  const { Email, OTP } = req.body;

  const user = await userModel.findOne({ Email });

  if (!user) {
    throw new AppError("User not found", 404);
  }
  
  if (Number(OTP) !== user.EmailOTP) {
    throw new AppError("Invalid OTP", 400);
  }

  await userModel.findByIdAndUpdate(user._id, {
    EmailOTP: null,
    isVerified: true,
  });

  const accessToken = jwt.sign(
    {
      id: user._id,
    },
    _config.JWT_ACCESS_SECRET,
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    _config.JWT_REFRESH_SECRET,
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnlt: true,
  });

  return res.status(200).json({
    success: true,
    message: "Email verified successfully!",
    data: {
      user,
      accessToken,
    },
  });
};

const userLoginController = async (req, res) => {
  const { Email, Password } = req.body;

  const user = await userModel.findOne({ Email });

  if (!user) {
    throw new AppError("Something went wrong");
  }

  const isValidPassword = await bcrypt.compare(Password, user.Password);

  if (!isValidPassword) {
    throw new AppError("Something went wrong");
  }

  const OTP = Math.floor(1000 + Math.random() * 9000);

  await userModel.findByIdAndUpdate(user._id, {
    EmailOTP: OTP,
    isVerified: true,
  });

  await sendEmail(
    Email,
    "Verify Your Email Address | ProVity",
    `Hi ${user.UserName}, your verification code is ${OTP}. It expires in 5 minutes.`,
    verificationEmailTemplate(user.UserName, OTP),
  );

  return res.status(200).json({
    message:
      "Login successfully complete, Please complete Email OTP Verification",
  });
};

export default {
  userRegisterController,
  emailVerifictionController,
  userLoginController,
};
