import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    UserName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    googleId: {
      type: String,
      default: null,
    },
    PhoneNo: {
      type: String,
      unique: true,
      default: null,
    },
    EmailOTP: {
      type: Number,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

const userModel = new mongoose.model("Users", userSchema);

export default userModel;
