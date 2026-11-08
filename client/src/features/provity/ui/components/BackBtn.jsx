import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigateHook } from "../../hooks/NavigationHook";

const BackBtn = () => {

    const {navigate} = useNavigateHook()

  return (
    <button
      type="button"
      onClick={() => navigate("/dashboard")}
      aria-label="Back to dashboard"
      className="flex h-10 w-12 items-center justify-center border border-white/20 text-xl text-white/80 transition hover:border-[#FC6C26] hover:text-[#FC6C26] sm:h-11 sm:w-14"
    >
      <IoArrowBackOutline />
    </button>
  );
};

export default BackBtn;
