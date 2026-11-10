import { axiosInsatnce } from "../../../config/axiosInstance";

export const createPlanAPI = async (data, accessToken) => {
  const response = await axiosInsatnce.post("/management/create-plan", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const getPlanAPI = async (accessToken) => {
  const response = await axiosInsatnce.get("/management/get-plan", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const savePlanTasks = async (data, id, accessToken) => {
  console.log(data, id, accessToken);
  const response = await axiosInsatnce.post(
    `/management/save-plan-tasks/${id}`,
    { tasks: data },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response;
};

export const getAllPlansAPI = async (accessToken) => {
  const response = await axiosInsatnce.get("/management/get-all-plans", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const getPlanAllTasks = async (id, accessToken) => {
  console.log(id , accessToken)
  const response = await axiosInsatnce.get(`/management/getPlan-tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
