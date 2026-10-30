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

export const getOneTaskAPI = async (id, accessToken) => {
  const response = await axiosInsatnce.get(`/flow/getflow/${id}/details`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const getDayWiseDataAPI = async (accessToken) => {
  const response = await axiosInsatnce.get("/flow/get-dayWise" , {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response
}

export const getTodayTaskDataAPI = async (accessToken) => {
  const response = await axiosInsatnce.get("/flow/today-tasks" , {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response
}