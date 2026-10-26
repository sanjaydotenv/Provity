import userModel from "../models/user.model.js";
import AppError from "../utils/app.error.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/emailMessage.js";
import verificationEmailTemplate from "../utils/emailTemplates.js";
import jwt from "jsonwebtoken";
import { _config } from "../config/config.js";

const userRegisterController = async (req, res) => {
  const { UserName, Email, Password, PhoneNo } = req.body;

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
    message: "Registration successfull. Please verify your email.",
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
    maxAge: 7 * 24 * 60 * 60 * 10000,
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

const getMeController = async (req, res) => {
  const { id } = req.user;

  if (!id) {
    throw new AppError("User ID is not found", 404);
  }

  const user = await userModel.findById(id);

  if (!user) {
    throw new AppError("User is not found", 404);
  }

  res.status(200).json({
    message: "User fetched successfully",
    user,
  });
};

const refreshAccessTokenViaRefresToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw new AppError("refresh Token not found");
  }

  let decoded = null;
  try {
    decoded = jwt.verify(refreshToken, _config.JWT_REFRESH_SECRET);

    if (!decoded) {
      throw new AppError("Invalid credentials");
    }

    const user = await userModel.findById(decoded.id);

    if (!user) {
      throw new AppError("user not found");
    }

    const accessToken = jwt.sign({ id: user._id }, _config.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    const newRefreshToken = jwt.sign(
      { id: user._id },
      _config.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 10000,
    });

    res.status(200).json({
      message: "reGenerate access and refresh Token",
      accessToken,
    });
  } catch (error) {
    throw new AppError(`Error while decoding refresh Token ${error.message}`);
  }
};

export default {
  userRegisterController,
  emailVerifictionController,
  userLoginController,
  getMeController,
  refreshAccessTokenViaRefresToken,
};
