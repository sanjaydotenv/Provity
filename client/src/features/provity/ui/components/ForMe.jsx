import React from "react";

const ForMe = ({ setShowMsg }) => {
  return (
    <div className="h-170 w-350 bg-red-500 items-center justify-center flex">
      <button
        onClick={() => {
          setShowMsg(false);
          console.log("running");
        }}
      >
        Back
      </button>
    </div>
  );
};

export default ForMe;
