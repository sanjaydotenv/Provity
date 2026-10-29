import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskAPI, getAllTasksAPI, getOneTaskAPI , getDayWiseDataAPI} from "../api/FlowAPI";
import { setDateWiseData, setFlowData, setOneFlowData } from "../state/FlowSlice";

export const useDashboardHook = () => {
  const [taskValue, setTaskValue] = useState({
    title: "",
    description: "",
  });
  const [descriptionToggleInput, setDescriptionToggleInput] = useState(false);
  const [msg, setMsg] = useState(true);
  const { accessToken } = useSelector((state) => state.auth);

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
    console.log(response)
    dispatch(setFlowData(response.data.allFlow));
  };

  const handleGetOneFlowData = async (id, accessToken) => {
    const response = await getOneTaskAPI(id, accessToken);
    dispatch(setOneFlowData(response.data.flow));
  };

  const handleDayWiseData = async (accessToken) => {
    const response = await getDayWiseDataAPI(accessToken)
    dispatch(setDateWiseData(response.data.data))
  }

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
    handleDayWiseData
  };
};
