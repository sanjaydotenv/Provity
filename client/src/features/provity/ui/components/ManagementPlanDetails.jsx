import { useNavigate } from "react-router";

import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiTarget,
  FiLayers,
  FiSave,
  FiCheckCircle,
  FiChevronDown,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useManagementHook } from "../../hooks/ManagementHook";
import Loading from "../../ui/components/Loading";

const ManagementPlanDetails = () => {
  const navigate = useNavigate();

  // Static Plan Data

  const { handleGetPlanAPI , handlePlanTaskInputData , handleSubmitSaveAllTasksData} = useManagementHook();
  const { accessToken } = useSelector((state) => state.auth);
  const { plan } = useSelector((state) => state.manage);

  useEffect(() => {
    if (!accessToken) return;

    handleGetPlanAPI(accessToken);
  }, [accessToken]);

  if (!plan) {
    return <Loading />;
  }

  const formateDate = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const startDate = formateDate(plan.startDate);
  const endDate = formateDate(plan.endDate);

  // Static Days and Tasks

  const filledTasks = 7;

  const days = [];
  for (let i = 0; i < plan.duration; i++) {
    days.push({
      dayNumber: i,
      date: "05 Nov 2026",
      title: "",
      description: "",
      priority: "High",
    });
  }

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

        {/* Task Forms */}
        <div className="space-y-4">
          {days.map((day) => (
            <div
              key={day.dayNumber}
              className="border border-[#252525] bg-[#101010] rounded-xl overflow-hidden"
            >
              {/* Day Header */}
              <div className="p-4 md:p-5 flex items-center gap-4 border-b border-[#252525]">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-[#FC6C26]/10 border border-[#FC6C26]/20 flex flex-col items-center justify-center">
                  <span className="text-[9px] text-[#FC6C26] uppercase">
                    Day
                  </span>

                  <span className="text-lg font-semibold text-[#FC6C26] leading-5">
                    {String(day.dayNumber + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Day {day.dayNumber + 1}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">{day.date}</p>
                </div>

                <span className="ml-auto flex items-center gap-1.5 text-[10px] text-green-400 bg-green-400/10 px-2.5 py-1.5 rounded-md">
                  <FiCheckCircle size={12} />
                  Filled
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
                  onChange={handlePlanTaskInputData}
                  name="title"
                  datatype={day.dayNumber + 1}
                    type="text"
                    defaultValue={day.title}
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
                  onChange={handlePlanTaskInputData}
                  name="description"
                  datatype={day.dayNumber + 1}
                    rows={2}
                    defaultValue={day.description}
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
                    onChange={handlePlanTaskInputData}
                    name="priority"
                    datatype={day.dayNumber + 1}
                      defaultValue={day.priority}
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
          ))}
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

              <p className="flex items-center gap-2 text-xs text-green-400 mt-3">
                <FiCheckCircle />
                All tasks are ready to save.
              </p>
            </div>

            <button onClick={handleSubmitSaveAllTasksData} className="flex items-center justify-center gap-2 bg-[#FC6C26] hover:bg-[#e85c1b] px-6 py-3 rounded-lg text-sm font-medium transition">
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
