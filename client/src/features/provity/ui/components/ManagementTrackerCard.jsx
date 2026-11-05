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
const ManagementTrackerCard = () => {
  return (
    <aside
      className="h-fit rounded-2xl border border-orange-500/30
            bg-gradient-to-br from-[#1b1512] via-[#111010] to-[#0e0d0d]
            p-6 xl:sticky xl:top-6"
    >
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
          <h3 className="text-xl font-bold">15 Days Plan</h3>

          <p className="text-sm text-gray-400">Your productivity plan</p>
        </div>
      </div>

      {/* PLAN DATES */}

      <div className="grid grid-cols-2 gap-4 py-5 border-y border-white/10">
        <div>
          <p className="text-xs text-gray-500 flex items-center gap-2 mb-2">
            <FiCalendar /> Created On
          </p>

          <p className="text-sm font-semibold">Nov 4, 2026</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 flex items-center gap-2 mb-2">
            <FiFlag /> Target Date
          </p>

          <p className="text-sm font-semibold">Nov 19, 2026</p>
        </div>
      </div>

      {/* PROGRESS */}

      <div className="flex items-center gap-6 py-6">
        <div className="relative w-28 h-28 shrink-0">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="56"
              cy="56"
              r="47"
              stroke="#333"
              strokeWidth="9"
              fill="none"
            />

            <circle
              cx="56"
              cy="56"
              r="47"
              stroke="#f97316"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="19.7 295"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold">6.7%</span>

            <span className="text-[10px] text-gray-400">Completed</span>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Tasks</span>
            <span>15</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Completed</span>
            <span className="text-green-400">1</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Pending</span>
            <span className="text-orange-400">14</span>
          </div>
        </div>
      </div>

      {/* TASK LIST */}

      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <FiList className="text-orange-500" />
          Plan Tasks
        </h3>

        <span className="text-xs text-gray-500">4 Tasks</span>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
        {/* TASK 1 */}

        <div
          className="flex items-center gap-3 p-3 rounded-xl
              bg-white/[0.035] border border-white/[0.05]"
        >
          <FiCheckCircle size={21} className="shrink-0 text-green-500" />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium line-through text-gray-500">
              Learn React Basics
            </p>

            <p className="text-xs text-gray-500 mt-1">Components, JSX, Props</p>
          </div>

          <span
            className="text-[10px] px-2 py-1 rounded-full
                bg-red-500/10 text-red-400"
          >
            High
          </span>
        </div>

        {/* TASK 2 */}

        <div
          className="flex items-center gap-3 p-3 rounded-xl
              bg-white/[0.035] border border-white/[0.05]"
        >
          <FiCircle size={21} className="shrink-0 text-gray-500" />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-200">
              Setup Development Environment
            </p>

            <p className="text-xs text-gray-500 mt-1">Node.js, VS Code, Git</p>
          </div>

          <span
            className="text-[10px] px-2 py-1 rounded-full
                bg-blue-500/10 text-blue-400"
          >
            Medium
          </span>
        </div>

        {/* TASK 3 */}

        <div
          className="flex items-center gap-3 p-3 rounded-xl
              bg-white/[0.035] border border-white/[0.05]"
        >
          <FiCircle size={21} className="shrink-0 text-gray-500" />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-200">
              Build a Simple Counter App
            </p>

            <p className="text-xs text-gray-500 mt-1">Using React</p>
          </div>

          <span
            className="text-[10px] px-2 py-1 rounded-full
                bg-green-500/10 text-green-400"
          >
            Low
          </span>
        </div>

        {/* TASK 4 */}

        <div
          className="flex items-center gap-3 p-3 rounded-xl
              bg-white/[0.035] border border-white/[0.05]"
        >
          <FiCircle size={21} className="shrink-0 text-gray-500" />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-200">
              Learn React Hooks
            </p>

            <p className="text-xs text-gray-500 mt-1">useState, useEffect</p>
          </div>

          <span
            className="text-[10px] px-2 py-1 rounded-full
                bg-blue-500/10 text-blue-400"
          >
            Medium
          </span>
        </div>
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
