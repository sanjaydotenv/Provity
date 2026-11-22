import React from "react";
import { FiCheckCircle, FiAlertTriangle, FiXCircle } from "react-icons/fi";

const ToasterMsg = ({ msg, status = "success" }) => {
  const styles = {
    success: {
      icon: <FiCheckCircle />,
      color: "text-green-400",
      border: "border-green-500/30",
      glow: "shadow-green-500/10",
      bg: "bg-green-500/10",
    },
    warning: {
      icon: <FiAlertTriangle />,
      color: "text-yellow-400",
      border: "border-yellow-500/30",
      glow: "shadow-yellow-500/10",
      bg: "bg-yellow-500/10",
    },
    error: {
      icon: <FiXCircle />,
      color: "text-red-400",
      border: "border-red-500/30",
      glow: "shadow-red-500/10",
      bg: "bg-red-500/10",
    },
  };

  const current = styles[status] || styles.success;

  return (
    <div
      role="alert"
      className={`
        relative flex items-center gap-3 w-fit max-w-[90vw]
        px-5 py-3 rounded-xl overflow-hidden
        backdrop-blur-2xl bg-[#171717]/80
        border ${current.border}
        shadow-xl ${current.glow}
        animate-toast-in
      `}
    >
      <div
        className={`absolute -left-5 -top-5 w-20 h-20 rounded-full blur-3xl ${current.bg}`}
      />

      <span className={`relative text-xl shrink-0 ${current.color}`}>
        {current.icon}
      </span>

      <p className="relative text-sm font-medium text-white/90">{msg}</p>
    </div>
  );
};

export default ToasterMsg;
