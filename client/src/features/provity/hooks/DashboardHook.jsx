import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskAPI,
  getAllTasksAPI,
  getOneTaskAPI,
  getDayWiseDataAPI,
  getTodayTaskDataAPI,
  markAsCompleteTaskAPI,
} from "../api/FlowAPI";
import {
  setDateWiseData,
  setFlowData,
  setOneFlowData,
  setTodayTasks,
} from "../state/FlowSlice";
import { useNavigateHook } from "./NavigationHook";

export const useDashboardHook = () => {
  const [taskValue, setTaskValue] = useState({
    title: "",
    description: "",
  });
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { navigate } = useNavigateHook();
  const [progressValue, setProgressValue] = useState({});
  const [descriptionToggleInput, setDescriptionToggleInput] = useState(false);
  const [msg, setMsg] = useState(true);
  const { accessToken } = useSelector((state) => state.auth);
  const { DateWiseData } = useSelector((state) => state.flow);

  const dispatch = useDispatch();

  const showDescriptionInput = () => {
    setDescriptionToggleInput(true);
  };

  const hideDescriptionInput = () => {
    setDescriptionToggleInput(false);
    setMsg(false);
  };

  const handleTasksData = (event) => {
    const { name, value } = event.target;

    setTaskValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTaskSubmit = async () => {
    try {
      const response = await addTaskAPI(taskValue, accessToken);

      console.log(response);

      setTaskValue({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Task creation failed:", error);
    }
  };

  const handleAllTasksData = async (accessToken) => {
    const response = await getAllTasksAPI(accessToken);
    console.log(response);
    dispatch(setFlowData(response.data.allFlow));
  };

  const handleGetOneFlowData = async (id, accessToken) => {
    const response = await getOneTaskAPI(id, accessToken);
    dispatch(setOneFlowData(response.data.flow));
  };

  const handleDayWiseData = async (accessToken) => {
    const response = await getDayWiseDataAPI(accessToken);
    dispatch(setDateWiseData(response.data.data));
  };

  const handleProgress = () => {
    if (DateWiseData) {
      setProgressValue(DateWiseData[0]);
    }
  };

  const handleTodayTasks = async (accessToken) => {
    const response = await getTodayTaskDataAPI(accessToken);
    dispatch(setTodayTasks(response.data.tasks));
  };

  const handleCompleteTask = async (id, accessToken) => {
    await markAsCompleteTaskAPI(id, accessToken);
    setIsDetailsOpen(false);
  };

  return {
    taskValue,
    setTaskValue,
    showDescriptionInput,
    hideDescriptionInput,
    descriptionToggleInput,
    setMsg,
    msg,
    handleTasksData,
    handleTaskSubmit,
    handleAllTasksData,
    handleGetOneFlowData,
    handleDayWiseData,
    setProgressValue,
    progressValue,
    handleProgress,
    DateWiseData,
    handleTodayTasks,
    handleCompleteTask,
    setIsDetailsOpen,
    isDetailsOpen,
  };
};
