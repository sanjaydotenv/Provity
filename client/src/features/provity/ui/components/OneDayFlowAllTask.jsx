import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiList,
  FiArrowUpRight,
  FiActivity,
  FiArrowLeft,
} from "react-icons/fi";

const OneDayFlowAllTask = () => {
  const { dayFlowAllTaskDetails } = useSelector((state) => state.flow);
  const navigate = useNavigate();

  const tasks = dayFlowAllTaskDetails?.tasks || [];

  const completedTasks = tasks.filter((task) => task.isDone).length;
  const pendingTasks = tasks.length - completedTasks;

  const completionRate = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  const selectedDate = tasks.length ? new Date(tasks[0].date) : null;

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "No Date Available";

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#101113] text-white">
      {/* Compact Header */}
      <header className="shrink-0 border-b border-white/[0.07] bg-[#151618] px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3 sm:gap-5">
            <button
              onClick={() => navigate(-1)}
              className="flex h-10 shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-white/70 transition-all hover:border-[#FC6C26]/40 hover:bg-[#FC6C26]/10 hover:text-[#FC6C26]"
            >
              <FiArrowLeft />
              <span>Back</span>
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <FiActivity className="shrink-0 text-[#FC6C26]" />

                <span className="text-[9px] font-semibold uppercase tracking-[2px] text-[#FC6C26]">
                  Daily Overview
                </span>
              </div>

              <h2 className="mt-1 truncate text-base font-semibold sm:text-lg">
                Your Daily Activity
              </h2>

              <p className="mt-1 flex items-center gap-1.5 text-[10px] text-white/40 sm:text-xs">
                <FiCalendar className="text-[#FC6C26]" />
                {formattedDate}
              </p>
            </div>
          </div>

          {/* Total Activities */}
          <div className="flex shrink-0 items-center gap-3 rounded-xl border border-[#FC6C26]/20 bg-[#FC6C26]/[0.06] px-4 py-2.5">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-white/40">
                Total Activities
              </p>

              <p className="text-xl font-bold text-[#FC6C26]">{tasks.length}</p>
            </div>

            <FiList className="text-xl text-[#FC6C26]" />
          </div>
        </div>

        {/* Compact Summary */}
        <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-5">
          <div className="flex items-center gap-2 rounded-lg border border-emerald-400/10 bg-emerald-400/[0.04] px-3 py-2">
            <FiCheckCircle className="text-emerald-400" />

            <span className="text-xs text-white/50">Completed</span>

            <span className="text-sm font-semibold text-emerald-400">
              {completedTasks}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-amber-400/10 bg-amber-400/[0.04] px-3 py-2">
            <FiClock className="text-amber-400" />

            <span className="text-xs text-white/50">Pending</span>

            <span className="text-sm font-semibold text-amber-400">
              {pendingTasks}
            </span>
          </div>

          <div className="flex min-w-[150px] flex-1 items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 py-2">
            <span className="shrink-0 text-xs text-white/45">Performance</span>

            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FC6C26] to-[#FFAD79] transition-all duration-700"
                style={{ width: `${completionRate}%` }}
              />
            </div>

            <span className="shrink-0 text-xs font-semibold text-[#FC6C26]">
              {completionRate}%
            </span>
          </div>
        </div>
      </header>

      {/* Task Cards */}
      <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-white/90">
              Activity Timeline
            </h3>

            <p className="mt-1 text-xs text-white/35">
              Everything you worked on this day.
            </p>
          </div>

          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[10px] text-white/45">
            {tasks.length} Records
          </span>
        </div>

        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {tasks.map((task, idx) => {
              const taskDate = new Date(task.date);

              const createdDate = taskDate.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

              const createdTime = taskDate.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });

              return (
                <article
                  key={task._id}
                  className="group relative flex min-h-[270px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#1b1c1f] via-[#17181a] to-[#121315] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FC6C26]/35 hover:shadow-xl hover:shadow-[#FC6C26]/[0.06] sm:p-6"
                >
                  {/* Background Glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#FC6C26]/[0.04] blur-[60px] transition-all duration-500 group-hover:bg-[#FC6C26]/[0.12]" />

                  {/* Card Header */}
                  <div className="relative flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
                          task.isDone
                            ? "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-400"
                            : "border-amber-400/20 bg-amber-400/[0.08] text-amber-400"
                        }`}
                      >
                        {task.isDone ? (
                          <FiCheckCircle className="text-xl" />
                        ) : (
                          <FiClock className="text-xl" />
                        )}
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-white/30">
                          Activity {String(idx + 1).padStart(2, "0")}
                        </p>

                        <p className="mt-1 text-xs text-white/50">
                          {createdDate}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold ${
                        task.isDone
                          ? "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-400"
                          : "border-amber-400/20 bg-amber-400/[0.07] text-amber-400"
                      }`}
                    >
                      {task.isDone ? "Completed" : "Pending"}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="relative mt-7">
                    <h4 className="text-base font-semibold leading-relaxed text-white/90 transition-colors group-hover:text-white sm:text-lg">
                      {task.title}
                    </h4>

                    <p
                      className={`mt-3 text-sm leading-7 ${
                        task.description
                          ? "text-white/45"
                          : "italic text-white/20"
                      }`}
                    >
                      {task.description || "No description provided."}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="relative mt-auto pt-7">
                    <div className="mb-4 h-px bg-white/[0.07]" />

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-white/40">
                          <FiCalendar />
                        </div>

                        <div>
                          <p className="text-[10px] text-white/30">
                            Created at
                          </p>

                          <p className="mt-1 text-xs font-medium text-white/70">
                            {createdTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] font-medium text-white/30 transition-colors group-hover:text-[#FC6C26]">
                        <span>Task Details</span>
                        <FiArrowUpRight />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.09] bg-white/[0.015] px-5 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#FC6C26]/15 bg-[#FC6C26]/[0.07]">
              <FiList className="text-2xl text-[#FC6C26]" />
            </div>

            <h3 className="text-base font-semibold text-white/75">
              No Activities Found
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/35">
              There are no tasks recorded for this day. Your activities will
              appear here once you start adding tasks.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default OneDayFlowAllTask;
