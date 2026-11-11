import React, { useState } from "react";
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

import {useSelector} from "react-redux"

const initialDays = [
  {
    day: 1,
    date: "Nov 4, 2025",
    tasks: [
      {
        id: 1,
        title: "Learn React Basics",
        description: "Components, JSX, Props",
        duration: "2h",
        color: "blue",
        completed: false,
      },
      {
        id: 2,
        title: "Setup Development Environment",
        description: "Node.js, VS Code, Git",
        duration: "1h",
        color: "purple",
        completed: false,
      },
      {
        id: 3,
        title: "Build a Simple Counter App",
        description: "Using React",
        duration: "1h",
        color: "green",
        completed: false,
      },
    ],
  },
  {
    day: 2,
    date: "Nov 5, 2025",
    tasks: [
      {
        id: 4,
        title: "Understanding React Hooks",
        description: "useState and useEffect",
        duration: "2h",
        color: "blue",
        completed: false,
      },
      {
        id: 5,
        title: "Practice React Components",
        description: "Reusable components",
        duration: "1h",
        color: "green",
        completed: false,
      },
    ],
  },
  {
    day: 3,
    date: "Nov 6, 2025",
    tasks: [
      {
        id: 6,
        title: "Learn React Router",
        description: "Routing and navigation",
        duration: "2h",
        color: "purple",
        completed: false,
      },
      {
        id: 7,
        title: "Create Multiple Pages",
        description: "Home, About and Contact",
        duration: "1h",
        color: "blue",
        completed: false,
      },
    ],
  },
  {
    day: 4,
    date: "Nov 7, 2025",
    tasks: [
      {
        id: 8,
        title: "Learn Context API",
        description: "Global state management",
        duration: "2h",
        color: "green",
        completed: false,
      },
      {
        id: 9,
        title: "Build a Small Project",
        description: "Apply learned concepts",
        duration: "2h",
        color: "blue",
        completed: false,
      },
    ],
  },
  {
    day: 5,
    date: "Nov 8, 2025",
    tasks: [
      {
        id: 10,
        title: "Introduction to Node.js",
        description: "Runtime and architecture",
        duration: "2h",
        color: "green",
        completed: false,
      },
      {
        id: 11,
        title: "Node.js Modules",
        description: "CommonJS and ES Modules",
        duration: "1h",
        color: "purple",
        completed: false,
      },
    ],
  },
];

const ManagementTaskDetails = () => {

  const [activeTab, setActiveTab] = useState("Tasks");

  const [days, setDays] = useState(initialDays);

  const [expandedDays, setExpandedDays] = useState([1]);

  const [showMenu, setShowMenu] = useState(null);

  const [planName, setPlanName] = useState("15 Days Plan");

  const totalTasks = days.reduce((total, day) => total + day.tasks.length, 0);

  const completedTasks = days.reduce(
    (total, day) => total + day.tasks.filter((task) => task.completed).length,
    0,
  );

  const data = useSelector(state => state.manage)
  console.log(data)

  const pendingTasks = totalTasks - completedTasks;

  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const toggleDay = (dayNumber) => {
    setExpandedDays((prev) =>
      prev.includes(dayNumber)
        ? prev.filter((day) => day !== dayNumber)
        : [...prev, dayNumber],
    );
  };

  const toggleTask = (dayNumber, taskId) => {
    setDays((prev) =>
      prev.map((day) =>
        day.day === dayNumber
          ? {
              ...day,
              tasks: day.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task,
              ),
            }
          : day,
      ),
    );
  };

  const addTask = () => {
    const title = window.prompt("Enter task title:");

    if (!title?.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: "New task",
      duration: "1h",
      color: "orange",
      completed: false,
    };

    setDays((prev) =>
      prev.map((day, index) =>
        index === 0 ? { ...day, tasks: [...day.tasks, newTask] } : day,
      ),
    );

    setExpandedDays((prev) => (prev.includes(1) ? prev : [...prev, 1]));
  };

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

  return (
    <div className="min-h-screen w-full bg-[var(--main-bg)] text-[var(--text-color)] p-3 sm:p-5">
      {/* MAIN CONTAINER */}
      <div className="mx-auto max-w-[1600px] space-y-4">
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-color)]/15 text-[var(--primary-color)] shadow-[0_0_25px_rgba(252,108,38,0.18)]">
              <FiCalendar size={30} />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                Plan Manager
              </h1>

              <p className="text-xs sm:text-sm text-white/45">
                Create and manage your 15-day plan with detailed tasks
              </p>
            </div>
          </div>

          <button
            onClick={addTask}
            className="flex items-center gap-2 rounded-full bg-[var(--primary-color)] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_25px_rgba(252,108,38,0.25)] transition hover:bg-[var(--primary-color2)] hover:text-white"
          >
            <FiPlus size={18} />
            Create New Plan
          </button>
        </div>

        {/* PLAN HERO CARD */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--primary-color)]/20 bg-gradient-to-r from-[#fc6c26]/10 via-[#171313] to-[#171313] p-5 sm:p-6">
          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-[var(--primary-color)]/10 blur-[70px]" />

          <div className="relative flex flex-col items-center gap-6 sm:flex-row">
            {/* PLAN ICON */}
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

            {/* PLAN INFORMATION */}
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold">{planName}</h2>

              <p className="mt-1 text-sm text-white/45">
                Your productivity plan
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="border-l-2 border-white/10 pl-4">
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <FiCalendar className="text-[var(--primary-color)]" />
                    Plan Created
                  </div>

                  <p className="mt-2 text-sm font-semibold">Nov 4, 2025</p>
                </div>

                <div className="border-l-2 border-white/10 pl-4">
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <FiFlag className="text-[var(--primary-color)]" />
                    Target Date
                  </div>

                  <p className="mt-2 text-sm font-semibold">Nov 19, 2025</p>
                </div>

                <div className="border-l-2 border-white/10 pl-4">
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <FiClock className="text-[var(--primary-color)]" />
                    Time Remaining
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-xl font-bold text-[var(--primary-color)]">
                      14 Days
                    </span>

                    <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold">
                      93% Left
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* PROGRESS CIRCLE */}
            <div className="flex shrink-0 flex-col items-center justify-center">
              <div
                className="relative flex h-28 w-28 items-center justify-center rounded-full"
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
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          {/* LEFT SECTION */}
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
                        ? "bg-[var(--primary-color)] text-black shadow-[0_0_20px_rgba(252,108,38,0.2)]"
                        : "text-white/50 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon size={15} />
                    {tab.name}
                  </button>
                );
              })}
            </div>

            {/* TASKS TAB */}
            {activeTab === "Tasks" && (
              <div className="space-y-1 p-3">
                {days.map((day) => {
                  const isExpanded = expandedDays.includes(day.day);

                  const dayCompleted = day.tasks.filter(
                    (task) => task.completed,
                  ).length;

                  return (
                    <div key={day.day}>
                      {/* DAY HEADER */}
                      <button
                        onClick={() => toggleDay(day.day)}
                        className="flex w-full items-center justify-between rounded-lg px-2 py-3 transition hover:bg-white/[0.04]"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          {isExpanded ? (
                            <FiChevronDown className="text-white/50" />
                          ) : (
                            <FiChevronRight className="text-white/50" />
                          )}

                          <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--primary-color)] shadow-[0_0_10px_var(--primary-color)]" />

                          <span className="truncate text-xs sm:text-sm font-semibold">
                            Day {day.day} – {day.date}
                          </span>

                          {day.day === 1 && (
                            <span className="hidden text-xs font-semibold text-[var(--primary-color)] sm:inline">
                              (Today)
                            </span>
                          )}
                        </div>

                        <span className="shrink-0 rounded-full bg-white/[0.07] px-3 py-1 text-[10px] font-medium text-white/70">
                          {dayCompleted} / {day.tasks.length}
                          {day.day === 1 && " Completed"}
                        </span>
                      </button>

                      {/* TASK LIST */}
                      {isExpanded && (
                        <div className="mb-2 space-y-1 rounded-xl bg-white/[0.02] p-1.5">
                          {day.tasks.map((task) => (
                            <div
                              key={task.id}
                              className="group flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.025] px-3 py-3 transition hover:border-[var(--primary-color)]/30 hover:bg-white/[0.05]"
                            >
                              {/* CHECKBOX */}
                              <button
                                onClick={() => toggleTask(day.day, task.id)}
                                className={`shrink-0 transition ${
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

                              {/* TASK DETAILS */}
                              <div className="min-w-0 flex-1">
                                <h4
                                  className={`truncate text-xs sm:text-sm font-semibold ${
                                    task.completed
                                      ? "text-white/35 line-through"
                                      : "text-white/90"
                                  }`}
                                >
                                  {task.title}
                                </h4>

                                <p className="mt-0.5 truncate text-[10px] sm:text-xs text-white/40">
                                  {task.description}
                                </p>
                              </div>

                              {/* DURATION */}
                              <span
                                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                  task.color === "blue"
                                    ? "bg-blue-500/20 text-blue-300"
                                    : task.color === "purple"
                                      ? "bg-purple-500/20 text-purple-300"
                                      : task.color === "green"
                                        ? "bg-green-500/20 text-green-300"
                                        : "bg-orange-500/20 text-orange-300"
                                }`}
                              >
                                {task.duration}
                              </span>

                              {/* MENU */}
                              <div className="relative">
                                <button
                                  onClick={() =>
                                    setShowMenu(
                                      showMenu === task.id ? null : task.id,
                                    )
                                  }
                                  className="rounded-md p-1.5 text-white/40 opacity-100 transition hover:bg-white/10 hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
                                >
                                  <FiMoreVertical size={16} />
                                </button>

                                {showMenu === task.id && (
                                  <div className="absolute right-0 top-8 z-20 w-36 overflow-hidden rounded-xl border border-white/10 bg-[#211c1c] p-1 shadow-xl">
                                    <button
                                      onClick={() => {
                                        const title = window.prompt(
                                          "Edit task title:",
                                          task.title,
                                        );

                                        if (title?.trim()) {
                                          setDays((prev) =>
                                            prev.map((d) =>
                                              d.day === day.day
                                                ? {
                                                    ...d,
                                                    tasks: d.tasks.map((t) =>
                                                      t.id === task.id
                                                        ? {
                                                            ...t,
                                                            title: title.trim(),
                                                          }
                                                        : t,
                                                    ),
                                                  }
                                                : d,
                                            ),
                                          );
                                        }

                                        setShowMenu(null);
                                      }}
                                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-white/70 hover:bg-white/10"
                                    >
                                      <FiEdit2 />
                                      Edit Task
                                    </button>

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
                          ))}

                          <button
                            onClick={() => {
                              const title = window.prompt("Enter task title:");

                              if (!title?.trim()) return;

                              setDays((prev) =>
                                prev.map((d) =>
                                  d.day === day.day
                                    ? {
                                        ...d,
                                        tasks: [
                                          ...d.tasks,
                                          {
                                            id: Date.now(),
                                            title: title.trim(),
                                            description: "New task",
                                            duration: "1h",
                                            color: "orange",
                                            completed: false,
                                          },
                                        ],
                                      }
                                    : d,
                                ),
                              );
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs text-white/40 transition hover:bg-white/5 hover:text-[var(--primary-color)]"
                          >
                            <FiPlus size={14} />
                            Add Task
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* OVERVIEW TAB */}
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
                      className="h-full rounded-full bg-[var(--primary-color)] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TIMELINE TAB */}
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
                    value: planName,
                  },
                  {
                    icon: FiCalendar,
                    label: "Created On",
                    value: "Nov 4, 2025",
                  },
                  {
                    icon: FiFlag,
                    label: "Deadline",
                    value: "Nov 19, 2025",
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
                            index >= 4 ? "text-[var(--primary-color)]" : ""
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

            {/* MOTIVATION CARD */}
            <div className="relative overflow-hidden rounded-2xl border border-[var(--primary-color)]/20 bg-gradient-to-br from-[#fc6c26]/20 to-[#171111] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--primary-color)]/20 text-[var(--primary-color)]">
                  <FiTarget size={32} />
                </div>

                <div>
                  <h3 className="text-sm font-bold">You're on track!</h3>

                  <p className="mt-1 text-[10px] text-white/60">
                    Just keep going, Mayur 🚀
                  </p>
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[var(--primary-color)] shadow-[0_0_12px_rgba(252,108,38,0.5)] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-2 flex justify-between text-[10px] text-white/40">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="rounded-2xl border border-white/10 bg-[#100e0e] p-4">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
                <FiZap size={18} className="text-[var(--primary-color)]" />
                Quick Actions
              </h3>

              <div className="space-y-2">
                <button
                  onClick={addTask}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] py-2.5 text-xs font-medium text-white/80 transition hover:border-[var(--primary-color)]/40 hover:bg-[var(--primary-color)]/10 hover:text-[var(--primary-color)]"
                >
                  <FiPlus size={15} />
                  Add Task
                </button>

                <button
                  onClick={() => setActiveTab("Overview")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] py-2.5 text-xs font-medium text-white/80 transition hover:border-[var(--primary-color)]/40 hover:bg-[var(--primary-color)]/10 hover:text-[var(--primary-color)]"
                >
                  <FiBarChart2 size={15} />
                  View Analytics
                </button>
              </div>
            </div>

            {/* PRODUCTIVITY CARD */}
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
