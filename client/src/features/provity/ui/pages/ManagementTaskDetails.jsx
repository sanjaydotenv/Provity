import React, { useEffect, useMemo, useState } from "react";

import {
  FiCalendar,
  FiPlus,
  FiList,
  FiBarChart2,
  FiClock,
  FiFlag,
  FiCheckCircle,
  FiCircle,
  FiChevronDown,
  FiChevronRight,
  FiMoreVertical,
  FiTarget,
  FiZap,
  FiInfo,
  FiTrendingUp,
  FiEdit2,
  FiTrash2,
  FiCheck,
} from "react-icons/fi";

import { useSelector } from "react-redux";
import { useManagementHook } from "../../hooks/ManagementHook";
import BackBtn from "../components/BackBtn";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigateHook } from "../../hooks/NavigationHook";

const ManagementTaskDetails = () => {
  const [activeTab, setActiveTab] = useState("Tasks");

  const [expandedDays, setExpandedDays] = useState([1]);

  const [showMenu, setShowMenu] = useState(null);

  const [days, setDays] = useState([]);

  const {navigate} = useNavigateHook()

  const { handleGetPlanAllTasks } = useManagementHook();

  const { accessToken } = useSelector((state) => state.auth);

  const { planAllTasks = [] } = useSelector((state) => state.manage);

  const planId = localStorage.getItem("planId");

  // FETCH PLAN TASKS
  useEffect(() => {
    if (planId && accessToken) {
      handleGetPlanAllTasks(planId, accessToken);
    }
  }, [planId, accessToken]);


  const latestPlan = useMemo(() => {
    if (!Array.isArray(planAllTasks) || !planAllTasks.length) {
      return null;
    }

    return [...planAllTasks].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.startDate || 0).getTime();

      const dateB = new Date(b.createdAt || b.startDate || 0).getTime();

      return dateB - dateA;
    })[0];
  }, [planAllTasks]);

  // FORMAT DATE
  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // CALCULATE DAY DATE
  const getDayDate = (startDate, dayNumber) => {
    if (!startDate) return "";

    const date = new Date(`${startDate}T00:00:00`);

    date.setDate(date.getDate() + dayNumber - 1);

    return formatDate(
      [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-"),
    );
  };

  // CONVERT PLAN TASKS INTO DAY-WISE DATA
  const formattedDays = useMemo(() => {
    if (!latestPlan) return [];

    const duration = Number(latestPlan.duration) || 0;

    const tasks = Array.isArray(latestPlan.Tasks) ? latestPlan.Tasks : [];

    return Array.from({ length: duration }, (_, index) => {
      const dayNumber = index + 1;

      const dayTasks = tasks.filter((task) => {
        const taskDay = Number(
          task.dayNumber ?? task.day ?? task.dayIndex ?? 1,
        );

        return taskDay === dayNumber;
      });

      return {
        day: dayNumber,

        date: getDayDate(latestPlan.startDate, dayNumber),

        tasks: dayTasks.map((task) => ({
          ...task,

          id: task._id || task.id,

          completed: Boolean(task.isDone ?? task.completed ?? false),

          duration: task.duration ? `${task.duration}h` : "1h",

          color:
            task.priority === "High"
              ? "orange"
              : task.priority === "Low"
                ? "green"
                : "blue",
        })),
      };
    });
  }, [latestPlan]);

  // SYNC DAYS WITH REDUX DATA
  useEffect(() => {
    setDays(formattedDays);

    setExpandedDays([1]);
  }, [formattedDays]);

  // TOTAL TASKS
  const totalTasks = days.reduce((total, day) => total + day.tasks.length, 0);

  // COMPLETED TASKS
  const completedTasks = days.reduce(
    (total, day) => total + day.tasks.filter((task) => task.completed).length,
    0,
  );

  // PENDING TASKS
  const pendingTasks = totalTasks - completedTasks;

  // PROGRESS
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // REMAINING DAYS
  const remainingDays = latestPlan
    ? Math.max(
        0,
        Math.ceil(
          (new Date(`${latestPlan.endDate}T23:59:59`).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24),
        ),
      )
    : 0;

  // TOGGLE DAY
  const toggleDay = (dayNumber) => {
    setExpandedDays((prev) =>
      prev.includes(dayNumber)
        ? prev.filter((day) => day !== dayNumber)
        : [...prev, dayNumber],
    );
  };

  // TOGGLE TASK
  const toggleTask = (dayNumber, taskId) => {
    setDays((prev) =>
      prev.map((day) =>
        day.day === dayNumber
          ? {
              ...day,

              tasks: day.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      completed: !task.completed,
                    }
                  : task,
              ),
            }
          : day,
      ),
    );
  };

  // ADD TASK
  const addTask = () => {
    alert("Connect your Add Task API here.");
  };

  // DELETE TASK
  const handleDeleteTask = (dayNumber, taskId) => {
    setDays((prev) =>
      prev.map((day) =>
        day.day === dayNumber
          ? {
              ...day,

              tasks: day.tasks.filter((task) => task.id !== taskId),
            }
          : day,
      ),
    );

    setShowMenu(null);
  };

  const tabs = [
    { name: "Tasks", icon: FiList },
    { name: "Overview", icon: FiBarChart2 },
    { name: "Timeline", icon: FiCalendar },
  ];

  // NO PLAN FOUND
  if (!latestPlan) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--main-bg)] p-5 text-[var(--text-color)]">
        <div className="text-center">
          <FiCalendar
            size={55}
            className="mx-auto mb-4 text-[var(--primary-color)]"
          />

          <h2 className="text-xl font-bold">No Plan Found</h2>

          <p className="mt-2 text-sm text-white/40">
            Create a new plan to start tracking your productivity.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[var(--main-bg)] p-3 text-[var(--text-color)] sm:p-5">
      <div className="mx-auto max-w-[1600px] space-y-4">
        {/* HEADER */}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-color)]/15 text-[var(--primary-color)]">
              <FiCalendar size={30} />
            </div>

            <div>
              <h1 className="text-xl font-bold sm:text-2xl">Plan Manager</h1>

              <p className="text-xs text-white/45 sm:text-sm">
                Manage your productivity and daily tasks
              </p>
            </div>
          </div>

          <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Back to dashboard"
                className="flex h-10 w-12 items-center justify-center border border-white/20 text-xl text-white/80 transition hover:border-[#FC6C26] hover:text-[#FC6C26] sm:h-11 sm:w-14"
              >
                <IoArrowBackOutline />
              </button>
        </div>

        {/* PLAN HERO */}

        <div className="relative overflow-hidden rounded-2xl border border-[var(--primary-color)]/20 bg-gradient-to-r from-[#fc6c26]/10 via-[#171313] to-[#171313] p-5 sm:p-6">
          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-[var(--primary-color)]/10 blur-[70px]" />

          <div className="relative flex flex-col items-center gap-6 sm:flex-row">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-color)]/10">
              <div className="relative">
                <FiCalendar
                  size={88}
                  className="text-[var(--primary-color)] drop-shadow-[0_0_15px_rgba(252,108,38,0.4)]"
                />

                <div className="absolute -bottom-1 -right-3 flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#191414] bg-[var(--primary-color)] text-black">
                  <FiClock size={24} />
                </div>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold">{latestPlan.title}</h2>

              <p className="mt-1 text-sm text-white/45">
                {latestPlan.description || "Your productivity plan"}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="border-l-2 border-white/10 pl-4">
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <FiCalendar className="text-[var(--primary-color)]" />
                    Plan Created
                  </div>

                  <p className="mt-2 text-sm font-semibold">
                    {formatDate(latestPlan.createdAt || latestPlan.startDate)}
                  </p>
                </div>

                <div className="border-l-2 border-white/10 pl-4">
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <FiFlag className="text-[var(--primary-color)]" />
                    Target Date
                  </div>

                  <p className="mt-2 text-sm font-semibold">
                    {formatDate(latestPlan.endDate)}
                  </p>
                </div>

                <div className="border-l-2 border-white/10 pl-4">
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <FiClock className="text-[var(--primary-color)]" />
                    Time Remaining
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xl font-bold text-[var(--primary-color)]">
                      {remainingDays} Days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* PROGRESS */}

            <div
              className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(var(--primary-color) ${progress}%, #292323 ${progress}%)`,
              }}
            >
              <div className="absolute inset-[10px] flex flex-col items-center justify-center rounded-full bg-[#191414]">
                <span className="text-xl font-bold">{progress}%</span>

                <span className="text-[10px] text-white/50">Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          {/* LEFT */}

          <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#100e0e]">
            {/* TABS */}

            <div className="flex items-center gap-1 overflow-x-auto border-b border-white/10 px-2 pt-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;

                return (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`flex shrink-0 items-center gap-2 rounded-t-xl px-5 py-3 text-xs font-medium transition ${
                      activeTab === tab.name
                        ? "bg-[var(--primary-color)] text-black"
                        : "text-white/50 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon size={15} />

                    {tab.name}
                    
                  </button>
                );
              })}
            </div>

            {/* TASKS */}

            {activeTab === "Tasks" && (
              <div className="space-y-1 p-3">
                {days.map((day) => {
                  const isExpanded = expandedDays.includes(day.day);

                  const dayCompleted = day.tasks.filter(
                    (task) => task.completed,
                  ).length;

                  return (
                    <div key={day.day}>
                      <button
                        onClick={() => {
                          toggleDay(day.day)
                        }}
                        className="flex w-full items-center justify-between rounded-lg px-2 py-3 transition hover:bg-white/[0.04]"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          {isExpanded ? (
                            <FiChevronDown className="text-white/50" />
                          ) : (
                            <FiChevronRight className="text-white/50" />
                          )}

                          <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--primary-color)]" />

                          <span className="truncate text-xs font-semibold sm:text-sm">
                            Day {day.day} – {day.date}
                          </span>
                        </div>

                        <span className="shrink-0 rounded-full bg-white/[0.07] px-3 py-1 text-[10px] text-white/70">
                          {dayCompleted} / {day.tasks.length} Completed
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="mb-2 space-y-1 rounded-xl bg-white/[0.02] p-1.5">
                          {day.tasks.length === 0 ? (
                            <div className="py-5 text-center text-xs text-white/30">
                              No tasks scheduled for this day.
                            </div>
                          ) : (
                            day.tasks.map((task) => (
                              <div
                                key={task.id}
                                className="group flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.025] px-3 py-3 transition hover:border-[var(--primary-color)]/30"
                              >
                                <button
                                  onClick={() => {
                                    console.log("hello ji ")
                                    toggleTask(day.day, task.id)
                                  }}
                                  className={`shrink-0 ${
                                    task.completed
                                      ? "text-[var(--primary-color)]"
                                      : "text-white/60 hover:text-[var(--primary-color)]"
                                  }`}
                                >
                                  {task.completed ? (
                                    <FiCheckCircle size={21} />
                                  ) : (
                                    <FiCircle size={21} />
                                  )}
                                </button>

                                <div className="min-w-0 flex-1">
                                  <h4
                                    className={`truncate text-xs font-semibold sm:text-sm ${
                                      task.completed
                                        ? "text-white/35 line-through"
                                        : "text-white/90"
                                    }`}
                                  >
                                    {task.title}
                                  </h4>

                                  <p className="mt-0.5 truncate text-[10px] text-white/40 sm:text-xs">
                                    {task.description || "No description"}
                                  </p>
                                </div>

                                <span
                                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                    task.color === "orange"
                                      ? "bg-orange-500/20 text-orange-300"
                                      : task.color === "green"
                                        ? "bg-green-500/20 text-green-300"
                                        : "bg-blue-500/20 text-blue-300"
                                  }`}
                                >
                                  {task.duration}
                                </span>

                                <div className="relative">
                                  <button
                                    onClick={() =>
                                      setShowMenu(
                                        showMenu === task.id ? null : task.id,
                                      )
                                    }
                                    className="rounded-md p-1.5 text-white/40 hover:bg-white/10 hover:text-white"
                                  >
                                    <FiMoreVertical size={16} />
                                  </button>

                                  {showMenu === task.id && (
                                    <div className="absolute right-0 top-8 z-20 w-36 rounded-xl border border-white/10 bg-[#211c1c] p-1 shadow-xl">
                                      <button
                                        onClick={() =>
                                          handleDeleteTask(day.day, task.id)
                                        }
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-red-400 hover:bg-red-500/10"
                                      >
                                        <FiTrash2 />
                                        Delete Task
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* OVERVIEW */}

            {activeTab === "Overview" && (
              <div className="space-y-4 p-5">
                <h3 className="text-lg font-bold">Plan Overview</h3>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    {
                      label: "Total Tasks",
                      value: totalTasks,
                      icon: FiList,
                    },
                    {
                      label: "Completed",
                      value: completedTasks,
                      icon: FiCheckCircle,
                    },
                    {
                      label: "Pending",
                      value: pendingTasks,
                      icon: FiClock,
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                      >
                        <Icon
                          size={20}
                          className="text-[var(--primary-color)]"
                        />

                        <p className="mt-3 text-2xl font-bold">{item.value}</p>

                        <p className="mt-1 text-xs text-white/40">
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="mb-3 flex justify-between text-sm">
                    <span className="text-white/60">Overall Progress</span>

                    <span className="font-bold text-[var(--primary-color)]">
                      {progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[var(--primary-color)] transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TIMELINE */}

            {activeTab === "Timeline" && (
              <div className="space-y-1 p-5">
                <h3 className="mb-5 text-lg font-bold">Plan Timeline</h3>

                {days.map((day) => (
                  <div key={day.day} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--primary-color)]/40 bg-[var(--primary-color)]/10 text-xs font-bold text-[var(--primary-color)]">
                        {day.day}
                      </div>

                      {day.day !== days.length && (
                        <div className="h-full min-h-10 w-px bg-white/10" />
                      )}
                    </div>

                    <div className="mb-4 min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <div className="flex justify-between gap-2">
                        <p className="text-sm font-semibold">Day {day.day}</p>

                        <span className="text-[10px] text-white/40">
                          {day.date}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-white/40">
                        {day.tasks.length} tasks scheduled
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}

          <div className="space-y-3">
            {/* PLAN DETAILS */}

            <div className="rounded-2xl border border-white/10 bg-[#100e0e] p-4">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
                <FiInfo size={18} className="text-[var(--primary-color)]" />
                Plan Details
              </h3>

              <div className="space-y-4">
                {[
                  {
                    icon: FiEdit2,
                    label: "Plan Name",
                    value: latestPlan.title,
                  },
                  {
                    icon: FiCalendar,
                    label: "Created On",
                    value: formatDate(
                      latestPlan.createdAt || latestPlan.startDate,
                    ),
                  },
                  {
                    icon: FiFlag,
                    label: "Deadline",
                    value: formatDate(latestPlan.endDate),
                  },
                  {
                    icon: FiList,
                    label: "Duration",
                    value: `${latestPlan.duration} Days`,
                  },
                  {
                    icon: FiList,
                    label: "Total Tasks",
                    value: totalTasks,
                  },
                  {
                    icon: FiCheckCircle,
                    label: "Completed",
                    value: completedTasks,
                  },
                  {
                    icon: FiClock,
                    label: "Pending",
                    value: pendingTasks,
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2 text-white/50">
                        <Icon
                          size={15}
                          className={
                            index >= 5 ? "text-[var(--primary-color)]" : ""
                          }
                        />

                        {item.label}
                      </div>

                      <span className="truncate font-medium text-white/85">
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MOTIVATION */}

            <div className="rounded-2xl border border-[var(--primary-color)]/20 bg-gradient-to-br from-[#fc6c26]/20 to-[#171111] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--primary-color)]/20 text-[var(--primary-color)]">
                  <FiTarget size={32} />
                </div>

                <div>
                  <h3 className="text-sm font-bold">Keep Going!</h3>

                  <p className="mt-1 text-[10px] text-white/60">
                    Every task brings you closer.
                  </p>
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[var(--primary-color)] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-2 flex justify-between text-[10px] text-white/40">
                <span>Progress</span>

                <span>{progress}%</span>
              </div>
            </div>

            {/* QUICK ACTIONS */}


            {/* PRODUCTIVITY */}

            <div className="rounded-2xl border border-white/10 bg-[#100e0e] p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold">
                <FiTrendingUp className="text-[var(--primary-color)]" />
                Productivity
              </h3>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {completedTasks}

                    <span className="text-sm text-white/40">/{totalTasks}</span>
                  </p>

                  <p className="mt-1 text-[10px] text-white/40">
                    Tasks completed
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                  <FiCheck size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementTaskDetails;
