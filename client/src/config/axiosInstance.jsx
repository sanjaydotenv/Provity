import axios from "axios";

export const axiosInsatnce = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
