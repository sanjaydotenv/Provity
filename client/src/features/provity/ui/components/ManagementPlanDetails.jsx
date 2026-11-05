import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiCircle,
  FiPlus,
  FiMoreHorizontal,
  FiEdit2,
  FiTrash2,
  FiX,
  FiTarget,
  FiLayers,
  FiCheck,
  FiChevronDown,
  FiFlag,
} from "react-icons/fi";

const initialPlan = {
  _id: "plan_01",
  title: "MERN Stack Mastery",
  description:
    "A structured learning roadmap to master MongoDB, Express, React and Node.js.",
  duration: 10,
  startDate: "2026-12-03",
  endDate: "2026-12-12",
};

const initialTasks = {
  1: [
    {
      id: 1,
      title: "Understand HTML Fundamentals",
      description: "Learn HTML structure, semantic tags and forms.",
      priority: "High",
      isDone: true,
    },
    {
      id: 2,
      title: "Practice CSS Basics",
      description: "Understand selectors, box model and positioning.",
      priority: "Medium",
      isDone: false,
    },
  ],
  2: [
    {
      id: 3,
      title: "CSS Flexbox",
      description: "Learn flex properties and practical layouts.",
      priority: "High",
      isDone: false,
    },
    {
      id: 4,
      title: "CSS Grid",
      description: "Build responsive layouts using CSS Grid.",
      priority: "Low",
      isDone: false,
    },
  ],
  3: [
    {
      id: 5,
      title: "JavaScript Variables",
      description: "Understand let, const, var and scope.",
      priority: "High",
      isDone: false,
    },
  ],
};

const formatDate = (date) => {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};

const getDateForDay = (startDate, dayNumber) => {
  const [year, month, day] = startDate.split("-").map(Number);

  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + dayNumber - 1);

  return date;
};

const getPriorityStyle = (priority) => {
  switch (priority) {
    case "High":
      return "text-red-400 bg-red-400/10 border-red-400/20";

    case "Medium":
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";

    default:
      return "text-blue-400 bg-blue-400/10 border-blue-400/20";
  }
};

const ManagementPlanDetails = () => {
  const navigate = useNavigate();

  const [plan] = useState(initialPlan);
  const [tasks, setTasks] = useState(initialTasks);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [editingTask, setEditingTask] = useState(null);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  const [openMenu, setOpenMenu] = useState(null);

  // Progress calculation
  const allTasks = Object.values(tasks).flat();

  const totalTasks = allTasks.length;

  const completedTasks = allTasks.filter((task) => task.isDone).length;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Generate days based on duration
  const days = useMemo(() => {
    return Array.from({ length: Number(plan.duration) }, (_, index) => {
      const dayNumber = index + 1;

      return {
        dayNumber,
        date: getDateForDay(plan.startDate, dayNumber),
        tasks: tasks[dayNumber] || [],
      };
    });
  }, [plan, tasks]);

  const openAddTask = (dayNumber) => {
    setSelectedDay(dayNumber);
    setEditingTask(null);

    setTaskForm({
      title: "",
      description: "",
      priority: "Medium",
    });

    setShowTaskModal(true);
  };

  const openEditTask = (dayNumber, task) => {
    setSelectedDay(dayNumber);
    setEditingTask(task);

    setTaskForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
    });

    setShowTaskModal(true);
    setOpenMenu(null);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    if (!taskForm.title.trim()) return;

    if (editingTask) {
      setTasks((prev) => ({
        ...prev,
        [selectedDay]: (prev[selectedDay] || []).map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...taskForm,
              }
            : task,
        ),
      }));
    } else {
      const newTask = {
        id: Date.now(),
        ...taskForm,
        isDone: false,
      };

      setTasks((prev) => ({
        ...prev,
        [selectedDay]: [...(prev[selectedDay] || []), newTask],
      }));
    }

    setShowTaskModal(false);
  };

  const toggleTask = (dayNumber, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [dayNumber]: (prev[dayNumber] || []).map((task) =>
        task.id === taskId
          ? {
              ...task,
              isDone: !task.isDone,
            }
          : task,
      ),
    }));
  };

  const deleteTask = (dayNumber, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [dayNumber]: (prev[dayNumber] || []).filter((task) => task.id !== taskId),
    }));

    setOpenMenu(null);
  };

  const getDayProgress = (dayTasks) => {
    if (!dayTasks.length) return 0;

    const completed = dayTasks.filter((task) => task.isDone).length;

    return Math.round((completed / dayTasks.length) * 100);
  };

  const getDayStatus = (dayNumber, dayTasks) => {
    if (dayTasks.length > 0 && dayTasks.every((task) => task.isDone)) {
      return {
        label: "Completed",
        style: "text-green-400 bg-green-400/10",
      };
    }

    if (dayTasks.length > 0) {
      return {
        label: "In Progress",
        style: "text-orange-400 bg-orange-400/10",
      };
    }

    return {
      label: "Not Started",
      style: "text-gray-500 bg-white/[0.04]",
    };
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white px-4 py-6 md:px-8 lg:px-10">
      {/* Main Container */}
      <div className="max-w-[1250px] mx-auto">
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
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-[#FC6C26]/10 border border-[#FC6C26]/20 flex items-center justify-center text-[#FC6C26]">
                <FiTarget size={23} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
                    {plan.title}
                  </h1>

                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#FC6C26]/10 text-[#FC6C26] border border-[#FC6C26]/20">
                    Active Plan
                  </span>
                </div>

                <p className="text-sm text-gray-500 max-w-xl leading-6">
                  {plan.description}
                </p>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 border border-[#303030] bg-[#171717] hover:bg-[#202020] px-4 py-2.5 rounded-lg text-sm transition">
              <FiEdit2 size={14} />
              Edit Plan
            </button>
          </div>

          {/* Plan Information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#252525]">
            <div>
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                <FiCalendar />
                Start Date
              </p>

              <p className="text-sm font-medium">
                {formatDate(getDateForDay(plan.startDate, 1))}{" "}
                {getDateForDay(plan.startDate, 1).getFullYear()}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                <FiCalendar />
                End Date
              </p>

              <p className="text-sm font-medium">
                {formatDate(getDateForDay(plan.startDate, plan.duration))}{" "}
                {getDateForDay(plan.startDate, plan.duration).getFullYear()}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                <FiClock />
                Duration
              </p>

              <p className="text-sm font-medium">{plan.duration} Days</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                <FiLayers />
                Total Tasks
              </p>

              <p className="text-sm font-medium">{totalTasks} Tasks</p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-sm font-medium">Overall Progress</p>

                <p className="text-xs text-gray-500 mt-1">
                  {completedTasks} of {totalTasks} tasks completed
                </p>
              </div>

              <span className="text-xl font-semibold text-[#FC6C26]">
                {progress}%
              </span>
            </div>

            <div className="h-2 w-full bg-[#252525] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FC6C26] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Daily Schedule Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-10 mb-6">
          <div>
            <h2 className="text-lg font-semibold">Daily Schedule</h2>

            <p className="text-xs text-gray-500 mt-1">
              Organize your tasks and track daily progress.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 border border-[#252525] bg-[#101010] px-3 py-2 rounded-lg w-fit">
            <FiLayers className="text-[#FC6C26]" />
            {plan.duration} Days Plan
          </div>
        </div>

        {/* Days List */}
        <div className="space-y-4">
          {days.map((day) => {
            const dayProgress = getDayProgress(day.tasks);
            const dayStatus = getDayStatus(day.dayNumber, day.tasks);

            return (
              <div
                key={day.dayNumber}
                className="border border-[#252525] bg-[#101010] rounded-xl overflow-hidden"
              >
                {/* Day Header */}
                <div className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-[#FC6C26]/10 border border-[#FC6C26]/20 flex flex-col items-center justify-center">
                      <span className="text-[9px] text-[#FC6C26] uppercase tracking-wider">
                        Day
                      </span>

                      <span className="text-lg font-semibold text-[#FC6C26] leading-5">
                        {String(day.dayNumber).padStart(2, "0")}
                      </span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold">
                          Day {day.dayNumber}
                        </h3>

                        <span
                          className={`text-[10px] px-2 py-1 rounded-md ${dayStatus.style}`}
                        >
                          {dayStatus.label}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 mt-1">
                        {day.date.toLocaleDateString("en-IN", {
                          weekday: "long",
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="text-right">
                      <p className="text-xs text-gray-400">
                        {day.tasks.filter((t) => t.isDone).length}/
                        {day.tasks.length} Tasks
                      </p>

                      <p className="text-[10px] text-gray-600 mt-1">
                        {dayProgress}% completed
                      </p>
                    </div>

                    <button
                      onClick={() => openAddTask(day.dayNumber)}
                      className="flex items-center gap-2 bg-[#FC6C26] hover:bg-[#e85c1b] text-white text-xs font-medium px-3 py-2.5 rounded-lg transition"
                    >
                      <FiPlus size={15} />
                      Add Task
                    </button>
                  </div>
                </div>

                {/* Day Progress */}
                <div className="px-5">
                  <div className="h-[3px] bg-[#252525] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FC6C26] transition-all duration-500"
                      style={{
                        width: `${dayProgress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Tasks */}
                <div className="p-4 md:p-5 space-y-2">
                  {day.tasks.length === 0 ? (
                    <div className="border border-dashed border-[#303030] rounded-lg py-7 flex flex-col items-center justify-center">
                      <FiLayers size={22} className="text-gray-600 mb-2" />

                      <p className="text-xs text-gray-500">
                        No tasks added for this day.
                      </p>

                      <button
                        onClick={() => openAddTask(day.dayNumber)}
                        className="text-xs text-[#FC6C26] mt-2 hover:underline"
                      >
                        + Create your first task
                      </button>
                    </div>
                  ) : (
                    day.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`group border rounded-lg p-3 flex items-start gap-3 transition ${
                          task.isDone
                            ? "border-[#252525] bg-[#0c0c0c] opacity-70"
                            : "border-[#252525] bg-[#151515] hover:border-[#3a3a3a]"
                        }`}
                      >
                        {/* Checkbox */}
                        <button
                          onClick={() => toggleTask(day.dayNumber, task.id)}
                          className={`mt-0.5 shrink-0 transition ${
                            task.isDone
                              ? "text-green-400"
                              : "text-gray-600 hover:text-[#FC6C26]"
                          }`}
                        >
                          {task.isDone ? (
                            <FiCheckCircle size={19} />
                          ) : (
                            <FiCircle size={19} />
                          )}
                        </button>

                        {/* Task Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4
                              className={`text-sm font-medium ${
                                task.isDone
                                  ? "line-through text-gray-500"
                                  : "text-gray-200"
                              }`}
                            >
                              {task.title}
                            </h4>

                            <span
                              className={`text-[9px] px-2 py-1 rounded border ${getPriorityStyle(
                                task.priority,
                              )}`}
                            >
                              {task.priority}
                            </span>
                          </div>

                          {task.description && (
                            <p className="text-xs text-gray-500 mt-1.5 leading-5">
                              {task.description}
                            </p>
                          )}
                        </div>

                        {/* Task Menu */}
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenMenu(openMenu === task.id ? null : task.id)
                            }
                            className="p-1.5 text-gray-500 hover:text-white rounded-md hover:bg-white/[0.05]"
                          >
                            <FiMoreHorizontal size={18} />
                          </button>

                          {openMenu === task.id && (
                            <div className="absolute right-0 top-8 z-20 w-36 bg-[#1b1b1b] border border-[#333] rounded-lg p-1 shadow-xl">
                              <button
                                onClick={() =>
                                  openEditTask(day.dayNumber, task)
                                }
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:bg-white/[0.05] rounded-md"
                              >
                                <FiEdit2 size={13} />
                                Edit Task
                              </button>

                              <button
                                onClick={() =>
                                  deleteTask(day.dayNumber, task.id)
                                }
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-400/10 rounded-md"
                              >
                                <FiTrash2 size={13} />
                                Delete Task
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Information */}
        <div className="mt-8 mb-5 border border-[#252525] bg-[#101010] rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#FC6C26]/10 flex items-center justify-center text-[#FC6C26]">
            <FiFlag size={17} />
          </div>

          <div>
            <p className="text-xs font-medium">
              Stay consistent with your plan
            </p>

            <p className="text-[11px] text-gray-500 mt-1">
              Small daily progress leads to big results.
            </p>
          </div>
        </div>
      </div>

      {/* Add / Edit Task Modal */}
      {showTaskModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowTaskModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[480px] bg-[#111111] border border-[#303030] rounded-2xl shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#252525]">
              <div>
                <h2 className="text-base font-semibold">
                  {editingTask ? "Edit Task" : "Create New Task"}
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Day {selectedDay} ·{" "}
                  {formatDate(getDateForDay(plan.startDate, selectedDay))}
                </p>
              </div>

              <button
                onClick={() => setShowTaskModal(false)}
                className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.05]"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleTaskSubmit} className="p-5 space-y-5">
              {/* Title */}
              <div>
                <label className="text-xs text-gray-400 block mb-2">
                  Task Title <span className="text-[#FC6C26]">*</span>
                </label>

                <input
                  type="text"
                  placeholder="e.g. Learn React Hooks"
                  value={taskForm.title}
                  onChange={(e) =>
                    setTaskForm({
                      ...taskForm,
                      title: e.target.value,
                    })
                  }
                  required
                  autoFocus
                  className="w-full bg-[#191919] border border-[#303030] focus:border-[#FC6C26] outline-none rounded-lg px-4 py-3 text-sm placeholder:text-gray-600 transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs text-gray-400 block mb-2">
                  Description
                </label>

                <textarea
                  rows={3}
                  placeholder="Describe what you want to accomplish..."
                  value={taskForm.description}
                  onChange={(e) =>
                    setTaskForm({
                      ...taskForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full resize-none bg-[#191919] border border-[#303030] focus:border-[#FC6C26] outline-none rounded-lg px-4 py-3 text-sm placeholder:text-gray-600 transition"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="text-xs text-gray-400 block mb-2">
                  Priority
                </label>

                <div className="relative">
                  <select
                    value={taskForm.priority}
                    onChange={(e) =>
                      setTaskForm({
                        ...taskForm,
                        priority: e.target.value,
                      })
                    }
                    className="w-full appearance-none bg-[#191919] border border-[#303030] focus:border-[#FC6C26] outline-none rounded-lg px-4 py-3 text-sm text-gray-300"
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>

                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#252525]">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2.5 text-xs text-gray-400 hover:text-white transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#FC6C26] hover:bg-[#e85c1b] rounded-lg text-xs font-medium transition"
                >
                  <FiCheck size={15} />

                  {editingTask ? "Save Changes" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementPlanDetails;
