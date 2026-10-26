import { useState } from "react";

export const useDashboardHook = () => {
  const [taskValue, setTaskValue] = useState("");
  const [descriptionToggleInput, setDescriptionToggleInput] = useState(false)
  const [msg, setMsg] = useState(true)

  const showDescriptionInput = () => {
    setDescriptionToggleInput(true)
  }

  const hideDescriptionInput = () => {
    setDescriptionToggleInput(false)
    setMsg(false)
  }

  return {
    taskValue,
    setTaskValue,
    showDescriptionInput,
    hideDescriptionInput,
    descriptionToggleInput,
    setMsg,
    msg
  };
};
