import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlanAPI, getAllPlansAPI, getPlanAPI, savePlanTasks } from "../api/ManagementAPI";
import { useNavigateHook } from "./NavigationHook";
import { setAllPlans, setPlan } from "../state/ManagementSlice";

export const useManagementHook = () => {
  const durations = [7, 10, 15, 30];

  const { accessToken } = useSelector((state) => state.auth);
  const { navigate } = useNavigateHook();

  const dispatch = useDispatch();

  const [planData, setPlanData] = useState({
    title: "",
    description: "",
    duration: 7,
    startDate: "",
    endDate: "",
  });

  // Calculate End Date
  const calculateEndDate = (startDate, duration) => {
    if (!startDate || !duration || Number(duration) < 1) {
      return "";
    }
    const [year, month, day] = startDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + Number(duration) - 1);
    const endYear = date.getFullYear();
    const endMonth = String(date.getMonth() + 1).padStart(2, "0");
    const endDay = String(date.getDate()).padStart(2, "0");
    return `${endYear}-${endMonth}-${endDay}`;
  };

  const handlePlanData = (e) => {
    const { name, value } = e.target;

    setPlanData((prev) => {
      const updatedData = {
        ...prev,
        [name]:
          name === "duration" ? (value === "" ? "" : Number(value)) : value,
      };

      // Automatically calculate End Date
      if (name === "startDate" || name === "duration") {
        updatedData.endDate = calculateEndDate(
          updatedData.startDate,
          updatedData.duration,
        );
      }

      return updatedData;
    });
  };

  const handleDurationSelect = (days) => {
    setPlanData((prev) => ({
      ...prev,
      duration: days,
      endDate: calculateEndDate(prev.startDate, days),
    }));
  };

  const handleCustomDuration = () => {
    setPlanData((prev) => ({
      ...prev,
      duration: "",
      endDate: "",
    }));
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();

    if (!planData.title.trim()) {
      return;
    }

    if (!planData.startDate || !planData.endDate) {
      return;
    }

    if (!planData.duration || Number(planData.duration) < 1) {
      return;
    }

    const response = await createPlanAPI(planData, accessToken);
    dispatch(setPlan(response.data.plan));
    navigate("/dashboard/management/details");
  };

  const handleGetPlanAPI = async (accessToken) => {
    const response = await getPlanAPI(accessToken);
    dispatch(setPlan(response.data.plan));
  };

  const handlePlanTaskInputData = (e) => {
    const dayNumber = Number(e.target.getAttribute("datatype"));
    const value = e.target.value;
    const key = e.target.name;

    setTasksData((prev) => ({
      ...prev,

      [dayNumber]: {
        ...(prev[dayNumber] || {}),
        [key]: value,
        dayNumber,
      },
    }));
  };

  const handleSubmitSaveAllTasksData = async (id, accessToken, tasks) => {
    try {
      const formattedData = Object.entries(tasks)
        .filter(([_, task]) => task.title.trim() !== "")
        .map(([dayNumber, task]) => ({
          title: task.title.trim(),
          description: task.description || "",
          dayNumber: Number(dayNumber),
          priority: task.priority || "Medium",
        }));

      if (formattedData.length === 0) {
        console.log("Please add at least one task");
        return;
      }

      const response = await savePlanTasks(formattedData, id, accessToken);

      console.log("Saved Tasks:", response.data);
      navigate("/dashboard/management")
    } catch (error) {
      console.log("Save Tasks Error:", error);
    }
  };

  const handleGetAllPlans = async (accessToken) => {
    const response = await getAllPlansAPI(accessToken)
    dispatch(setAllPlans(response.data.plans))
  }

  return {
    durations,
    planData,
    handlePlanData,
    handleDurationSelect,
    handleCustomDuration,
    handleCreatePlan,
    handleGetPlanAPI,
    handlePlanTaskInputData,
    handleSubmitSaveAllTasksData,
    handleGetAllPlans
  };
};
