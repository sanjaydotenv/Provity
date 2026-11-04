import React from "react";
import { useSelector } from "react-redux";
import {
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiCircle,
  FiList,
} from "react-icons/fi";

const OneDayFlowAllTask = () => {
  const { dayFlowAllTaskDetails } = useSelector((state) => state.flow);

  const tasks = dayFlowAllTaskDetails?.tasks || [];

  const completedTasks = tasks.filter((task) => task.isDone).length;
  const pendingTasks = tasks.length - completedTasks;

  const completionRate = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  return (
    <div className="h-[80vh] w-full overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#111214] p-5 sm:p-7">
      {/* Header */}
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[#FC6C26]">
            <FiList />
            <span className="text-[10px] font-semibold uppercase tracking-[2px]">
              Daily Activity
            </span>
          </div>

          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            All Tasks
          </h2>

          <p className="mt-1 text-xs text-white/35">
            Review your daily productivity and activities.
          </p>
        </div>

        <div className="rounded-xl border border-[#FC6C26]/20 bg-[#FC6C26]/[0.07] px-4 py-3">
          <p className="text-[10px] text-white/40">Total Tasks</p>

          <p className="mt-1 text-xl font-semibold text-[#FC6C26]">
            {tasks.length}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
          <p className="text-[10px] text-white/40">Completed</p>

          <h3 className="mt-1 text-xl font-semibold text-emerald-400">
            {completedTasks}
          </h3>
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
          <p className="text-[10px] text-white/40">Pending</p>

          <h3 className="mt-1 text-xl font-semibold text-amber-400">
            {pendingTasks}
          </h3>
        </div>

        <div className="col-span-2 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 sm:col-span-1">
          <p className="text-[10px] text-white/40">Completion Rate</p>

          <h3 className="mt-1 text-xl font-semibold text-[#FC6C26]">
            {completionRate}%
          </h3>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-7 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs text-white/50">Daily Progress</span>

          <span className="text-xs font-semibold text-[#FC6C26]">
            {completionRate}%
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FC6C26] to-[#FF9B62] transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Task List */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/85">
          Activity Timeline
        </h3>

        <span className="text-[10px] text-white/30">
          {tasks.length} Activities
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task, idx) => (
            <article
              key={task._id}
              className="group rounded-xl border border-white/[0.07] bg-[#171819] p-4 transition duration-300 hover:border-[#FC6C26]/25 hover:bg-[#1b1b1c]"
            >
              <div className="flex items-start gap-3">
                {/* Status Icon */}
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                    task.isDone
                      ? "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-400"
                      : "border-amber-400/20 bg-amber-400/[0.08] text-amber-400"
                  }`}
                >
                  {task.isDone ? (
                    <FiCheckCircle className="text-lg" />
                  ) : (
                    <FiClock className="text-lg" />
                  )}
                </div>

                {/* Task Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h4
                      className={`text-sm font-medium leading-relaxed ${
                        task.isDone ? "text-white/65" : "text-white/90"
                      }`}
                    >
                      {task.title}
                    </h4>

                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-[9px] font-medium ${
                        task.isDone
                          ? "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-400"
                          : "border-amber-400/20 bg-amber-400/[0.07] text-amber-400"
                      }`}
                    >
                      {task.isDone ? "Completed" : "Pending"}
                    </span>
                  </div>

                  {task.description && (
                    <p className="mt-2 text-xs leading-relaxed text-white/40">
                      {task.description}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-white/35">
                      <FiCalendar />

                      <span>
                        {new Date(task.date).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <span className="text-[10px] text-white/20">
                      Task #{String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="flex min-h-60 flex-col items-center justify-center text-center">
            <FiCircle className="mb-3 text-3xl text-white/20" />

            <h3 className="text-sm font-medium text-white/70">
              No Tasks Found
            </h3>

            <p className="mt-1 text-xs text-white/30">
              No activities available for this day.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OneDayFlowAllTask;
