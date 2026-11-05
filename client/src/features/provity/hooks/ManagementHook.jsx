import { useState } from "react";

export const useManagementHook = () => {
  const durations = [7, 10, 15, 30];

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

  const handleCreatePlan = (e) => {
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

    console.log("Plan Data:", planData);

  };

  return {
    durations,
    planData,
    handlePlanData,
    handleDurationSelect,
    handleCustomDuration,
    handleCreatePlan,
  };
};
