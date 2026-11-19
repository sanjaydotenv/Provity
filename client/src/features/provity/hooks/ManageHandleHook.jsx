import { useState } from "react";
import { createHandleAPI, getAllHandlesAPI } from "../api/manageHandleAPI";
import { useSelector, useDispatch } from "react-redux";
import { setAllHandle } from "../state/managHandlesSlice";

export const useManageHandleHook = () => {
  const [form, setForm] = useState({
    name: "",
    category: "Projects",
    password: "",
    description: "",
    username: "",
    url: "",
  });

  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form, accessToken);
    const response = await createHandleAPI(form, accessToken);

    console.log(response);
  };

  const getAllHandles = async (accessToken) => {
    const response = await getAllHandlesAPI(accessToken);
    console.log(response.data.data)
    dispatch(setAllHandle(response.data.data));
  };
  return { setForm, form, handleSubmit, getAllHandles };
};
