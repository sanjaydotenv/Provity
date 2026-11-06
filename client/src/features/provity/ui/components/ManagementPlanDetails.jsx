import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiTarget,
  FiLayers,
  FiSave,
  FiCheckCircle,
  FiChevronDown,
  FiAlertCircle,
} from "react-icons/fi";

import { useManagementHook } from "../../hooks/ManagementHook";
import Loading from "../../ui/components/Loading";

const ManagementPlanDetails = () => {
  const navigate = useNavigate();

  const {
  handleGetPlanAPI,
  handleSubmitSaveAllTasksData,
} = useManagementHook();

  const { accessToken } = useSelector((state) => state.auth);
  const { plan } = useSelector((state) => state.manage);

  // Local task state
  const [tasks, setTasks] = useState({});
  const [error, setError] = useState("");

  // Get Plan
  useEffect(() => {
    if (!accessToken) return;

    handleGetPlanAPI(accessToken);
  }, [accessToken]);

  // Initialize tasks according to plan duration
  useEffect(() => {
    if (!plan?.duration) return;

    setTasks((prev) => {
      const updatedTasks = { ...prev };

      for (let i = 1; i <= plan.duration; i++) {
        if (!updatedTasks[i]) {
          updatedTasks[i] = {
            title: "",
            description: "",
            priority: "Medium",
          };
        }
      }

      return updatedTasks;
    });
  }, [plan?._id, plan?.duration]);

  // Loading
  if (!plan) {
    return <Loading />;
  }

  // Format Date
  const formatDate = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  // Get Day Date
  const getDayDate = (dayNumber) => {
    if (!plan.startDate) return "";

    const date = new Date(plan.startDate);

    date.setDate(date.getDate() + dayNumber - 1);

    return formatDate(date);
  };

  const startDate = formatDate(plan.startDate);
  const endDate = formatDate(plan.endDate);

  // Generate Days
  const days = Array.from({ length: plan.duration }, (_, index) => ({
    dayNumber: index + 1,
    date: getDayDate(index + 1),
  }));

  // Count Filled Tasks
  const filledTasks = days.filter((day) =>
    tasks[day.dayNumber]?.title?.trim(),
  ).length;

  // Handle Input Change
  const handleTaskChange = (e) => {
    const { name, value } = e.target;

    const dayNumber = Number(e.target.dataset.day);

    setTasks((prev) => ({
      ...prev,
      [dayNumber]: {
        ...prev[dayNumber],
        [name]: value,
      },
    }));

    if (name === "title") {
      setError("");
    }
  };

  // Validate and Save Tasks
  const handleSaveTasks = () => {
    const emptyDay = days.find((day) => !tasks[day.dayNumber]?.title?.trim());

    // Title Validation
    if (emptyDay) {
      const message = `Please enter task title for Day ${emptyDay.dayNumber}`;

      setError(message);

      // Scroll to empty title
      const element = document.getElementById(`day-${emptyDay.dayNumber}`);

      element?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      return;
    }

    setError("");

    // Save all tasks through existing hook
    handleSubmitSaveAllTasksData(plan._id, accessToken , tasks)
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white px-4 py-6 md:px-8 lg:px-10">
      <div className="max-w-[1100px] mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-7"
        >
          <FiArrowLeft size={17} />
          Back to Management
        </button>

        {/* Plan Header */}
        <div className="border border-[#252525] bg-[#101010] rounded-2xl p-5 md:p-7">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-[#FC6C26]/10 border border-[#FC6C26]/20 flex items-center justify-center text-[#FC6C26]">
              <FiTarget size={23} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-xl md:text-2xl font-semibold">
                  {plan.title}
                </h1>

                <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#FC6C26]/10 text-[#FC6C26] border border-[#FC6C26]/20">
                  Active Plan
                </span>
              </div>

              <p className="text-sm text-gray-500 leading-6">
                {plan.description}
              </p>
            </div>
          </div>

          {/* Plan Information */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-8 pt-6 border-t border-[#252525]">
            <div>
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                <FiCalendar />
                Start Date
              </p>

              <p className="text-sm font-medium">{startDate}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                <FiCalendar />
                End Date
              </p>

              <p className="text-sm font-medium">{endDate}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                <FiClock />
                Duration
              </p>

              <p className="text-sm font-medium">{plan.duration} Days</p>
            </div>
          </div>
        </div>

        {/* Task Creation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-10 mb-6">
          <div>
            <h2 className="text-lg font-semibold">Create Daily Tasks</h2>

            <p className="text-xs text-gray-500 mt-1">
              Add tasks for each day of your management plan.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 border border-[#252525] bg-[#101010] px-3 py-2 rounded-lg w-fit">
            <FiLayers className="text-[#FC6C26]" />
            {filledTasks}/{plan.duration} Days Filled
          </div>
        </div>

        {/* Validation Error */}
        {error && (
          <div className="mb-5 flex items-center gap-3 border border-red-500/20 bg-red-500/10 text-red-400 rounded-lg px-4 py-3">
            <FiAlertCircle size={17} />

            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Task Forms */}
        <div className="space-y-4">
          {days.map((day) => {
            const task = tasks[day.dayNumber] || {
              title: "",
              description: "",
              priority: "Medium",
            };

            const isFilled = Boolean(task.title.trim());

            return (
              <div
                key={day.dayNumber}
                id={`day-${day.dayNumber}`}
                className={`border ${
                  error.includes(`Day ${day.dayNumber}`)
                    ? "border-red-500/50"
                    : "border-[#252525]"
                } bg-[#101010] rounded-xl overflow-hidden transition`}
              >
                {/* Day Header */}
                <div className="p-4 md:p-5 flex items-center gap-4 border-b border-[#252525]">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-[#FC6C26]/10 border border-[#FC6C26]/20 flex flex-col items-center justify-center">
                    <span className="text-[9px] text-[#FC6C26] uppercase">
                      Day
                    </span>

                    <span className="text-lg font-semibold text-[#FC6C26] leading-5">
                      {String(day.dayNumber).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">
                      Day {day.dayNumber}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">{day.date}</p>
                  </div>

                  <span
                    className={`ml-auto flex items-center gap-1.5 text-[10px] px-2.5 py-1.5 rounded-md ${
                      isFilled
                        ? "text-green-400 bg-green-400/10"
                        : "text-gray-500 bg-white/5"
                    }`}
                  >
                    <FiCheckCircle size={12} />

                    {isFilled ? "Filled" : "Pending"}
                  </span>
                </div>

                {/* Task Form */}
                <div className="p-4 md:p-5 space-y-5">
                  {/* Title */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">
                      Task Title
                      <span className="text-[#FC6C26] ml-1">*</span>
                    </label>

                    <input
                      onChange={handleTaskChange}
                      name="title"
                      data-day={day.dayNumber}
                      type="text"
                      value={task.title}
                      placeholder={`Enter task for Day ${day.dayNumber}`}
                      className="w-full bg-[#191919] border border-[#303030] focus:border-[#FC6C26] outline-none rounded-lg px-4 py-3 text-sm placeholder:text-gray-600 transition"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">
                      Description
                    </label>

                    <textarea
                      onChange={handleTaskChange}
                      name="description"
                      data-day={day.dayNumber}
                      rows={2}
                      value={task.description}
                      placeholder="Describe what you want to accomplish..."
                      className="w-full resize-none bg-[#191919] border border-[#303030] focus:border-[#FC6C26] outline-none rounded-lg px-4 py-3 text-sm placeholder:text-gray-600 transition"
                    />
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">
                      Priority
                    </label>

                    <div className="relative">
                      <select
                        onChange={handleTaskChange}
                        name="priority"
                        data-day={day.dayNumber}
                        value={task.priority}
                        className="w-full appearance-none bg-[#191919] border border-[#303030] focus:border-[#FC6C26] outline-none rounded-lg px-4 py-3 text-sm text-gray-300"
                      >
                        <option value="Low">Low Priority</option>

                        <option value="Medium">Medium Priority</option>

                        <option value="High">High Priority</option>
                      </select>

                      <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Save Section */}
        <div className="mt-8 mb-10 border border-[#252525] bg-[#101010] rounded-xl p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <h3 className="text-sm font-semibold">
                Ready to save your tasks?
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {filledTasks} tasks added across {plan.duration} days.
              </p>

              <p
                className={`flex items-center gap-2 text-xs mt-3 ${
                  filledTasks === plan.duration
                    ? "text-green-400"
                    : "text-yellow-500"
                }`}
              >
                <FiCheckCircle />

                {filledTasks === plan.duration
                  ? "All tasks are ready to save."
                  : `${plan.duration - filledTasks} day(s) still need a title.`}
              </p>
            </div>

            <button
              onClick={handleSaveTasks}
              className="flex items-center justify-center gap-2 bg-[#FC6C26] hover:bg-[#e85c1b] px-6 py-3 rounded-lg text-sm font-medium transition"
            >
              <FiSave size={17} />
              Save All Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementPlanDetails;
