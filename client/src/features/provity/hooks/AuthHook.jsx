import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  accessTokenViaRefreshToken,
  getMeAPI,
  loginAPI,
  registerAPI,
  verifyOTP,
} from "../api/AuthAPI";
import { useNavigateHook } from "./NavigationHook";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../state/AuthSlice";

export const useAuthHook = () => {
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector((state) => state.auth);
  const { navigate } = useNavigateHook();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDataRegister = async (data) => {
    const obj = { ...data, PhoneNo: Number(data["PhoneNo"]) };
    const response = await registerAPI(obj);
    console.log(response);
    sessionStorage.setItem("verifyEmail", data.Email);
    navigate("/auth/verify");
  };

  const handleOTPVerification = async (OTP) => {
    const OTPVerificationData = { OTP, Email: user.Email };
    const response = await verifyOTP(OTPVerificationData);
    console.log(response);
    navigate("/dashboard");
  };

  const handleGetMe = async () => {
    const response = await getMeAPI(accessToken);
    dispatch(setUserData(response.data.user));
    console.log(response);
  };

  const handleDataLogin = async (data) => {
    const response = await loginAPI(data);
    console.log(response);
    console.log(user);
    await handleGetMe()
    navigate("/auth/verify");
  };

  const handleGoogleOAuth = async () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  const getNewAccessTokenViaRefreshToken = async () => {
    const response = await accessTokenViaRefreshToken();

    return response;
  };

  return {
    register,
    handleSubmit,
    errors,
    handleDataRegister,
    handleOTPVerification,
    handleGoogleOAuth,
    handleDataLogin,
    handleGetMe,
    getNewAccessTokenViaRefreshToken,
  };
};
