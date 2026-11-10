import React from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiCircle,
  FiMoreHorizontal,
  FiFlag,
  FiTarget,
  FiList,
  FiTrendingUp,
} from "react-icons/fi";
import { useSelector } from "react-redux";

const ManagementTrackerCard = () => {
  const { planAllTasks } = useSelector((state) => state.manage);

  const trackData = planAllTasks?.[0];

  // Sort tasks without modifying Redux state
  const tasks = [...(trackData?.Tasks ?? [])].sort(
    (a, b) => a.dayNumber - b.dayNumber,
  );

  // Calculate task statistics
  const totalTasks = tasks.length;

  const completed = tasks.filter((task) => task.isDone).length;

  const pending = totalTasks - completed;

  const progress =
    totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;

  // Circular progress calculation
  const circumference = 2 * Math.PI * 47;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Priority colors
  const priorityColors = {
    High: "bg-red-500/10 text-red-400",
    Medium: "bg-blue-500/10 text-blue-400",
    Low: "bg-green-500/10 text-green-400",
  };

  return (
    <aside
      className="h-fit rounded-2xl border border-orange-500/30
            bg-gradient-to-br from-[#1b1512] via-[#111010] to-[#0e0d0d]
            p-6 xl:sticky xl:top-6"
    >
      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FiTarget className="text-orange-500 text-xl" />

          <h2 className="text-lg font-semibold">Plan Details</h2>
        </div>

        <button className="text-gray-400 hover:text-white">
          <FiMoreHorizontal size={23} />
        </button>
      </div>

      {/* PLAN INFO */}

      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-14 h-14 rounded-xl bg-orange-500/10
              flex items-center justify-center"
        >
          <FiCalendar className="text-orange-500 text-3xl" />
        </div>

        <div>
          <h3 className="text-xl font-bold">
            {trackData?.duration ?? 0} Days Plan
          </h3>

          <p className="text-sm text-gray-400">
            {trackData?.title || "Your productivity plan"}
          </p>
        </div>
      </div>

      {/* PLAN DATES */}

      <div className="grid grid-cols-2 gap-4 py-5 border-y border-white/10">
        <div>
          <p className="text-xs text-gray-500 flex items-center gap-2 mb-2">
            <FiCalendar /> Created On
          </p>

          <p className="text-sm font-semibold">
            {formatDate(trackData?.startDate)}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 flex items-center gap-2 mb-2">
            <FiFlag /> Target Date
          </p>

          <p className="text-sm font-semibold">
            {formatDate(trackData?.endDate)}
          </p>
        </div>
      </div>

      {/* PROGRESS */}

      <div className="flex items-center gap-6 py-6">
        <div className="relative w-28 h-28 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
            {/* Background Circle */}

            <circle
              cx="56"
              cy="56"
              r="47"
              stroke="#333"
              strokeWidth="9"
              fill="none"
            />

            {/* Progress Circle */}

            <circle
              cx="56"
              cy="56"
              r="47"
              stroke="#f97316"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-700"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold">{progress}%</span>

            <span className="text-[10px] text-gray-400">Completed</span>
          </div>
        </div>

        {/* TASK STATISTICS */}

        <div className="flex-1 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Tasks</span>

            <span>{totalTasks}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Completed</span>

            <span className="text-green-400">{completed}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Pending</span>

            <span className="text-orange-400">{pending}</span>
          </div>
        </div>
      </div>

      {/* TASK LIST */}

      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <FiList className="text-orange-500" />
          Plan Tasks
        </h3>

        <span className="text-xs text-gray-500">{totalTasks} Tasks</span>
      </div>

      {/* DYNAMIC TASKS */}

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center gap-3 p-3 rounded-xl
              bg-white/[0.035] border border-white/[0.05]"
            >
              {/* TASK STATUS ICON */}

              {task.isDone ? (
                <FiCheckCircle size={21} className="shrink-0 text-green-500" />
              ) : (
                <FiCircle size={21} className="shrink-0 text-gray-500" />
              )}

              {/* TASK INFORMATION */}

              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium break-words ${
                    task.isDone ? "line-through text-gray-500" : "text-gray-200"
                  }`}
                >
                  {task.title}
                </p>

                {task.description && (
                  <p className="text-xs text-gray-500 mt-1 break-words">
                    {task.description}
                  </p>
                )}

                <p className="text-[10px] text-gray-600 mt-1">
                  Day {task.dayNumber}
                </p>
              </div>

              {/* PRIORITY */}

              <span
                className={`shrink-0 text-[10px] px-2 py-1 rounded-full ${
                  priorityColors[task.priority] || priorityColors.Medium
                }`}
              >
                {task.priority || "Medium"}
              </span>
            </div>
          ))
        ) : (
          <div className="p-5 text-center rounded-xl bg-white/[0.035] border border-white/[0.05]">
            <FiList className="mx-auto text-gray-500 text-2xl mb-2" />

            <p className="text-sm text-gray-400">No tasks available</p>
          </div>
        )}
      </div>

      {/* FOOTER */}

      <div
        className="mt-6 p-4 rounded-xl bg-orange-500/10
            border border-orange-500/10"
      >
        <div className="flex items-center gap-2 mb-2">
          <FiTrendingUp className="text-orange-500" />

          <span className="text-sm font-semibold">Keep Moving Forward!</span>
        </div>

        <p className="text-xs text-gray-400 leading-5">
          Every completed task brings you one step closer to achieving your
          goal.
        </p>
      </div>
    </aside>
  );
};

export default ManagementTrackerCard;
