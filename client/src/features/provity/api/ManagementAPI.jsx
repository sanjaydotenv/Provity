import { axiosInsatnce } from "../../../config/axiosInstance";

export const createPlanAPI = async (data, accessToken) => {
  const response = await axiosInsatnce.post("/management/create-plan", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const getPlanAPI = async (id , accessToken) => {
  const response = await axiosInsatnce.get(`/management/get-plan/${id}`, {
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
  const response = await axiosInsatnce.get(`/management/getPlan-tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const planTaskCompleteAPI = async (data, accessToken) => {
  console.log(data , accessToken)
  const response = await axiosInsatnce.patch(
    "/management/plan-task-completed",
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response;
};
