import {
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
} from "react-icons/io5";

const TIME_ZONE = "Asia/Kolkata";

const formatDate = (date) => {
  if (!date || Number.isNaN(new Date(date).getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(new Date(date));
};

const formatTime = (date) => {
  if (!date || Number.isNaN(new Date(date).getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: TIME_ZONE,
  }).format(new Date(date));
};

const TaskCardUI = ({ task, index = 0 }) => {
  const isDone = task?.isDone === true;

  if (!task || typeof task !== "object" || Array.isArray(task)) {
    return null;
  }

  return (
    <article
      className={`group relative flex h-[140px] min-w-0 flex-col overflow-hidden rounded-xl border p-3 transition-all duration-300 hover:-translate-y-1 ${
        isDone
          ? "border-emerald-400/20 bg-gradient-to-br from-emerald-400/[0.08] via-[#121416] to-[#0D0D0F] hover:border-emerald-400/40"
          : "border-white/10 bg-gradient-to-br from-white/[0.07] via-[#121416] to-[#0D0D0F] hover:border-[#FC6C26]/40"
      }`}
    >
      {/* Glass reflection */}
      <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Background glow */}
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100 ${
          isDone ? "bg-emerald-400/10" : "bg-[#FC6C26]/10"
        }`}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between gap-2">
        <span className="text-[10px] font-medium tracking-widest text-white/35">
          TASK {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[9px] font-semibold ${
            isDone
              ? "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300"
              : "border-[#FC6C26]/20 bg-[#FC6C26]/[0.08] text-[#FFAD83]"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isDone ? "bg-emerald-300" : "bg-[#FC6C26]"
            }`}
          />
          {isDone ? "Completed" : "Pending"}
        </span>
      </div>

      {/* Title */}
      <h3
        title={task?.title || "Untitled Task"}
        className={`relative mt-3 truncate text-sm font-semibold ${
          isDone ? "text-white/50 line-through" : "text-white/90"
        }`}
      >
        {task?.title || "Untitled Task"}
      </h3>

      {/* Description */}
      <p
        title={task?.description || ""}
        className="relative mt-1 line-clamp-2 break-words text-[11px] leading-4 text-white/40"
      >
        {task?.description?.trim() || "No description added."}
      </p>

      {/* Footer */}
      <div className="relative mt-auto flex items-center justify-between gap-2 border-t border-white/[0.07] pt-2">
        <span className="flex min-w-0 items-center gap-1 text-[10px] text-white/40">
          <IoCalendarOutline className="shrink-0" />
          <span className="truncate">{formatDate(task?.createdAt)}</span>
        </span>

        <span
          className={`flex shrink-0 items-center gap-1 text-[10px] ${
            isDone ? "text-emerald-300/70" : "text-[#FC8B55]/70"
          }`}
        >
          {isDone ? <IoCheckmarkCircleOutline /> : <IoTimeOutline />}
          {formatTime(task?.createdAt)}
        </span>
      </div>
    </article>
  );
};

export default TaskCardUI;
