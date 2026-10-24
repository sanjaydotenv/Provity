import { useNavigate } from "react-router";

export const useNavigateHook = () => {
  const navigate = useNavigate();

  return {
    navigate,
  };
};
