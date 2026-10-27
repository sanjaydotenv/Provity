import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskAPI, getAllTasksAPI } from "../api/FlowAPI";
import { setFlowData } from "../state/FlowSlice";

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
    dispatch(setFlowData(response.data.allFlow));
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
  };
};
