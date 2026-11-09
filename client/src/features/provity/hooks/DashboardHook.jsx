import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskAPI,
  getAllTasksAPI,
  getOneTaskAPI,
  getDayWiseDataAPI,
  getTodayTaskDataAPI,
  markAsCompleteTaskAPI,
  updateFlowAPI,
} from "../api/FlowAPI";
import {
  setDateWiseData,
  setFlowData,
  setOneFlowData,
  setTodayTasks,
} from "../state/FlowSlice";

export const useDashboardHook = () => {
  const [taskValue, setTaskValue] = useState({
    title: "",
    description: "",
  });
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [progressValue, setProgressValue] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    progress: 0,
  });

  const totalTasks = progressValue?.totalTasks || 0;
  const completed = progressValue?.completedTasks || 0;
  const pending = progressValue?.incompleteTasks || 0;

  const progress = totalTasks > 0 ? (completed / totalTasks) * 100 : 0;

  const [descriptionToggleInput, setDescriptionToggleInput] = useState(false);
  const [msg, setMsg] = useState(true);
  const { accessToken } = useSelector((state) => state.auth);
  const { DateWiseData } = useSelector((state) => state.flow);
  const dateWiseAllTaskShowRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const recentTasks  = DateWiseData?.slice(0,6)



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
    console.log(DateWiseData)
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


  const handleUpdatedTask = async (id, accessToken , data) => {
    const response = await updateFlowAPI(id, accessToken , data);
    console.log(response)
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
    handleUpdatedTask,
    dateWiseAllTaskShowRef,
    setSidebarOpen,
    sidebarOpen,
    totalTasks,
    completed,
    pending,
    progress,
    recentTasks
  };
};
