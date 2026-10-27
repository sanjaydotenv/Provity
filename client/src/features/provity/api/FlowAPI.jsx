import { axiosInsatnce } from "../../../config/axiosInstance";

export const addTaskAPI = async (data, accessToken) => {
  console.log(accessToken);
  const response = await axiosInsatnce.post("/flow/create-flow", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const getAllTasksAPI = async (accessToken) => {
  const response = await axiosInsatnce.get("/flow/get-flow", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
