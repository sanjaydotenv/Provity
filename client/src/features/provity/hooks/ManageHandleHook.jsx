import { useState } from "react";

export const useManageHandleHook = () => {
  const [form, setForm] = useState({
    name: "",
    category: "Projects",
    description: "",
    username: "",
    url: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return { setForm, form, handleSubmit };
};
