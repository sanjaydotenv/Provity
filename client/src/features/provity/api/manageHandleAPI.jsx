import { axiosInsatnce } from "../../../config/axiosInstance";

export const createHandleAPI = async (data, accessToken) => {
  return await axiosInsatnce.post("/manage/add-handle", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getAllHandlesAPI = async (accessToken) => {
  return await axiosInsatnce.get("/manage/get-all-handles", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
