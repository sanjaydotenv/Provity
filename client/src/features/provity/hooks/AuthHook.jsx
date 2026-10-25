import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { registerAPI, verifyOTP } from "../api/AuthAPI";

export const useAuthHook = () => {
  const navigate = useNavigate();

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
    const Email = sessionStorage.getItem("verifyEmail");
    const OTPVerificationData = { OTP, Email: Email };
    const response = await verifyOTP(OTPVerificationData);
    console.log(response);
    navigate("/dashboard");
  };

  const handleGoogleOAuth = async () => {
    window.location.href = "http://localhost:3000/api/auth/google"
  };

  return {
    register,
    handleSubmit,
    errors,
    handleDataRegister,
    handleOTPVerification,
    handleGoogleOAuth,
  };
};
