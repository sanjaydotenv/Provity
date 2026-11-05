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
  const response = await axiosInsatnce.get("/management/get-plan" , {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response
}