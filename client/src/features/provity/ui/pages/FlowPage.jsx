import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  IoAddOutline,
  IoArrowBackOutline,
  IoCalendarOutline,
  IoCheckmarkDoneOutline,
  IoCheckmarkCircleOutline,
  IoCloseOutline,
  IoCreateOutline,
  IoSparklesOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";

import ProvityLogo from "../components/ProvityLogo";
import { useNavigateHook } from "../../hooks/NavigationHook";
import { useDashboardHook } from "../../hooks/DashboardHook";
import TaskCardUI from "../components/TaskCardUI";
import Loading from "../components/Loading";

const FlowPage = () => {
  const { navigate } = useNavigateHook();
  const { handleDayWiseData, handleTodayTasks } = useDashboardHook();

  const { accessToken } = useSelector((state) => state.auth);
  const { oneFlow, DateWiseData , todayTasks } = useSelector((state) => state.flow);

  const [ isDetailsOpen , setIsDetailsOpen ] = useState(false);

  useEffect(() => {
    handleTodayTasks(accessToken);
  }, [accessToken]);
  

  useEffect(() => {
    if (!isDetailsOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isDetailsOpen]);

  if (!todayTasks) {
    return <Loading />;
  }

  const formatCreatedDate = (date) => {
    if (!date) return "Unavailable";

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    }).format(new Date(date));
  };

  const formatUpdatedDate = (date) => {
    if (!date) return "Unavailable";

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }).format(new Date(date));
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--main-bg)] px-4 py-4 sm:px-7 sm:py-5">
      {/* Header */}
      <div className="flex items-center justify-between px-1 py-2">
        <ProvityLogo />

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          aria-label="Back to dashboard"
          className="flex h-10 w-12 items-center justify-center border border-white/20 text-xl text-white/80 transition hover:border-[#FC6C26] hover:text-[#FC6C26] sm:h-11 sm:w-14"
        >
          <IoArrowBackOutline />
        </button>
      </div>

      {/* Main Content */}
      <main className="mx-auto min-h-[calc(100svh-100px)] w-full max-w-7xl pb-24 pt-8 sm:pt-10">
        {/* Page Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-[var(--primary-color)]">
              Your productivity
            </p>

            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              My Tasks<span className="text-[var(--primary-color)]">.</span>
            </h1>

            <p className="mt-2 text-sm text-white/40">
              Keep your day organized, one task at a time.
            </p>
          </div>

          {/* Task Count */}
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
              <LuClipboardList size={20} />
            </div>

            <div>
              <p className="text-lg font-semibold leading-5 text-white">
                {Array.isArray(todayTasks)
                  ? todayTasks?.length
                  : 0}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40">
                Total tasks
              </p>
            </div>
          </div>
        </div>

        {/* Tasks */}
        {!Array.isArray(todayTasks) || todayTasks?.length === 0 ? (
          <section className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-5 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--primary-color)]/20 bg-[var(--primary-color)]/[0.08] text-[var(--primary-color)]">
              <LuClipboardList size={32} strokeWidth={1.4} />
            </div>

            <h2 className="text-xl font-semibold text-white">
              Nothing on your plate yet.
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-white/40">
              You haven't added any tasks yet. Create your first task and start
              organizing your day.
            </p>

            <button
              type="button"
              onClick={() => navigate("/dashboard/add-flow")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--primary-color)] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-110 active:scale-95"
            >
              <IoAddOutline size={20} />
              Create your first task
            </button>
          </section>
        ) : (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium text-white/70">
                All your tasks
              </h2>

              <span className="text-xs text-white/35">
                {todayTasks?.length}{" "}
                {todayTasks?.length === 1 ? "task" : "tasks"}
              </span>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-3 sm:gap-4">
              {todayTasks?.map((task, index) => (
                <TaskCardUI
                  key={task._id || index}
                  task={task}
                  index={index}
                  onOpen={() => setIsDetailsOpen(true)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Floating Add Task Button */}
      <button
        onClick={() => navigate("/dashboard/add-flow")}
        type="button"
        aria-label="Add new task"
        className="group fixed bottom-5 right-5 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary-color)] text-black shadow-[0_0_20px_rgba(252,108,38,0.35)] transition-all duration-300 ease-out hover:scale-110 hover:shadow-[0_0_35px_rgba(252,108,38,0.75)] active:scale-90 animate-[taskPulse_2.2s_ease-in-out_infinite] sm:bottom-8 sm:right-8 sm:h-[68px] sm:w-[68px] lg:bottom-10 lg:right-10 lg:h-[74px] lg:w-[74px]"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-[var(--primary-color)] opacity-40 blur-xl transition-all duration-500 group-hover:opacity-90 group-hover:blur-2xl" />

        <span className="pointer-events-none absolute inset-[-5px] rounded-full border border-[var(--primary-color)]/50 animate-[ringPulse_2.2s_ease-out_infinite]" />

        <IoAddOutline
          size={42}
          strokeWidth={1.5}
          className="relative z-10 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110"
        />

        <span className="pointer-events-none absolute right-full mr-4 translate-x-2 whitespace-nowrap rounded-lg border border-white/10 bg-[#171717] px-4 py-2 text-sm font-medium text-white opacity-0 shadow-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          + Create a new task
        </span>
      </button>

      {/* Animations */}
      <style>{`
        @keyframes taskPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 15px rgba(252, 108, 38, 0.25);
          }
          50% {
            transform: scale(1.07);
            box-shadow: 0 0 32px rgba(252, 108, 38, 0.65);
          }
        }

        @keyframes ringPulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.45);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[taskPulse_2\\.2s_ease-in-out_infinite\\],
          .animate-\\[ringPulse_2\\.2s_ease-out_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>

      {/* Task Details Modal */}
      {isDetailsOpen && oneFlow && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden overscroll-none bg-black/70 p-3 backdrop-blur-md sm:p-5"
          onClick={() => setIsDetailsOpen(false)}
        >
          {/* Background Glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FC6C26]/10 blur-[100px]" />

          {/* Modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[min(780px,calc(100dvh-24px))] w-full max-w-4xl flex-col overflow-hidden overscroll-contain rounded-3xl border border-white/10 bg-[#111112]/95 shadow-[0_25px_100px_rgba(0,0,0,0.7)] sm:h-[min(780px,calc(100dvh-40px))]"
          >
            {/* Reflection */}
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            {/* Ambient Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#FC6C26]/10 blur-[90px]" />

            {/* Modal Header */}
            <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#111112]/95 px-5 py-4 sm:px-8 sm:py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#FC6C26]/20 bg-[#FC6C26]/10 text-[#FC8B55]">
                  <IoSparklesOutline size={22} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#FC8B55]">
                    PROVITY / WORKSPACE
                  </p>
                  <h2 className="mt-1 text-sm text-white/70">Task Details</h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsDetailsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                aria-label="Close task details"
              >
                <IoCloseOutline size={22} />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain p-5 sm:p-7 lg:p-8">
              {/* Status */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
                    oneFlow.isDone
                      ? "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300"
                      : "border-[#FC6C26]/20 bg-[#FC6C26]/[0.08] text-[#FFAD83]"
                  }`}
                >
                  {oneFlow.isDone ? (
                    <IoCheckmarkCircleOutline size={16} />
                  ) : (
                    <IoTimeOutline size={16} />
                  )}

                  {oneFlow.isDone ? "Completed" : "Pending"}
                </span>

                <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-white/40">
                  Task #{oneFlow._id?.slice(-6) || "N/A"}
                </span>
              </div>

              {/* Title and Description */}
              <div className="mt-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
                  TASK TITLE
                </p>

                <h1 className="mt-3 break-words text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {oneFlow.title || "Untitled Task"}
                  <span className="text-[#FC6C26]">.</span>
                </h1>

                <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-white/50">
                  {oneFlow.description?.trim() ||
                    "No description has been added to this task yet."}
                </p>
              </div>

              {/* Status Highlight */}
              <div className="mt-6 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.045] to-transparent p-4 sm:p-5">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
                      oneFlow.isDone
                        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                        : "border-[#FC6C26]/20 bg-[#FC6C26]/10 text-[#FC8B55]"
                    }`}
                  >
                    {oneFlow.isDone ? (
                      <IoCheckmarkCircleOutline size={26} />
                    ) : (
                      <IoTimeOutline size={26} />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white/90">
                      {oneFlow.isDone
                        ? "Task completed successfully"
                        : "Task waiting for completion"}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/40">
                      {oneFlow.isDone
                        ? "Great work! Keep building your productivity."
                        : "Stay focused and complete this task when you're ready."}
                    </p>
                  </div>

                  <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.025] sm:flex">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        oneFlow.isDone ? "bg-emerald-400" : "bg-[#FC6C26]"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Activity Details */}
              <div className="mt-6">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                  ACTIVITY DETAILS
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Created Date */}
                  <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#FC6C26]/15 bg-[#FC6C26]/[0.08] text-[#FC8B55]">
                        <IoCalendarOutline size={19} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-white/40">Created on</p>

                        <p className="mt-1 text-sm font-medium text-white/90">
                          {formatCreatedDate(oneFlow.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Updated Date */}
                  <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#FC6C26]/15 bg-[#FC6C26]/[0.08] text-[#FC8B55]">
                        <IoTimeOutline size={19} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-white/40">Last updated</p>

                        <p className="mt-1 text-sm font-medium text-white/90">
                          {formatUpdatedDate(oneFlow.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Task ID */}
              <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">
                  TASK REFERENCE ID
                </p>

                <p className="mt-2 break-all font-mono text-xs leading-5 text-white/50">
                  {oneFlow._id || "Unavailable"}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="relative z-10 flex shrink-0 flex-col gap-4 border-t border-white/[0.08] bg-[#111112]/95 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <span className="flex items-center gap-2 text-xs text-white/35">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Provity Workspace
              </span>

              {/* UI-only action buttons */}
              <div className="grid grid-cols-1 gap-2 sm:flex sm:items-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#FC6C26]/25 bg-[#FC6C26]/[0.08] px-5 py-3 text-sm font-medium text-[#FC8B55] transition duration-200 hover:border-[#FC6C26]/50 hover:bg-[#FC6C26]/15 hover:text-[#FFAD83] active:scale-[0.98]"
                >
                  <IoCreateOutline size={18} />
                  Update Task
                </button>

                {oneFlow.isDone ? (
                  <button
                    type="button"
                    className="inline-flex cursor-default items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] px-5 py-3 text-sm font-medium text-emerald-300"
                  >
                    <IoCheckmarkCircleOutline size={18} />
                    Task Completed
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-[#07130c] shadow-[0_4px_20px_rgba(52,211,153,0.08)] transition duration-200 hover:bg-emerald-300 hover:shadow-[0_4px_24px_rgba(52,211,153,0.18)] active:scale-[0.98]"
                  >
                    <IoCheckmarkDoneOutline size={18} />
                    Mark as Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowPage;
