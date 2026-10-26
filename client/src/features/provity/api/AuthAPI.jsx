import { axiosInsatnce } from "../../../config/axiosInstance";

export const registerAPI = async (data) => {
  const response = await axiosInsatnce.post("/auth/register", data);

  return response;
};

export const verifyOTP = async (data) => {
  const response = await axiosInsatnce.post("/auth/verify-email", data);
  return response;
};

export const getMeAPI = async (accessToken) => {
  const response = await axiosInsatnce.get("/auth/get-me" , {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response
}

export const loginAPI = async (data) => {
  const response = await axiosInsatnce.post("/auth/login" , data)

  return response
}

export const accessTokenViaRefreshToken = async () => {
  const response = await axiosInsatnce.post("/auth/refresh-token")

  return response
}