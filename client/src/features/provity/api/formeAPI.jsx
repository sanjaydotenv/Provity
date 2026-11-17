import { axiosInsatnce } from "../../../config/axiosInstance";

export const createHabitAPI = async (data, token) => {
  return await axiosInsatnce.post("/forme/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllHabits = async (token) => {
  return await axiosInsatnce.get("/forme/get-all-habits", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
