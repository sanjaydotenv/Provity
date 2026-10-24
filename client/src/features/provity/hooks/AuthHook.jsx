import { useForm } from "react-hook-form";
import { registerAPI, verifyOTP } from "../api/AuthAPI";
import { useNavigate } from "react-router";

export const useAuthHook = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDataRegister = async (data) => {
    const obj = { ...data, "PhoneNo": Number(data["PhoneNo"]) };
    const response = await registerAPI(obj);
    console.log(response);
    sessionStorage.setItem("verifyEmail" , data.Email)
    navigate("/auth/verify");
  };

  const handleOTPVerification = async (OTP) => {
    const Email = sessionStorage.getItem("verifyEmail")
    const OTPVerificationData = {OTP , "Email": Email}
    const response = await verifyOTP(OTPVerificationData)
    console.log(response)
  };

  return {
    register,
    handleSubmit,
    errors,
    handleDataRegister,
    handleOTPVerification,
  };
};
