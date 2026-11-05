import React from "react";
import { FiCalendar, FiClock, FiEye } from "react-icons/fi";
import { useNavigateHook } from "../../hooks/NavigationHook";

const ManagementCard = () => {

  const {navigate} = useNavigateHook()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* PLAN 1 */}

      <div
        className="relative rounded-2xl p-6 border border-orange-500
                    shadow-[0_0_20px_rgba(249,115,22,0.15)]
                    bg-gradient-to-br from-orange-500/[0.09] to-[#171313]"
      >
        <div className="flex justify-between items-start gap-3 mb-5">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center
                      text-orange-500 bg-orange-500/10"
          >
            <FiCalendar size={27} />
          </div>

          <span
            className="text-xs font-semibold px-3 py-2 rounded-full border
                      bg-green-500/10 text-green-400 border-green-500/20"
          >
            Active
          </span>
        </div>

        <h3 className="text-xl font-semibold mb-2">15 Days Plan</h3>

        <p className="text-sm text-gray-400 min-h-10 leading-6">
          Complete your next 15 days plan with detailed tasks.
        </p>

        <div className="flex flex-wrap justify-between gap-3 mt-6 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-orange-500" />
            Nov 4, 2026
          </div>

          <div className="flex items-center gap-2">
            <FiClock className="text-gray-400" />
            15 Days
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-3">Deadline: Nov 19, 2026</div>

        <div className="flex items-center gap-3 mt-6">
          <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-orange-500"
              style={{ width: "6.7%" }}
            />
          </div>

          <span className="text-sm font-semibold">6.7%</span>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
          <span className="text-sm text-gray-400">1 / 15 Tasks</span>

          <button
          onClick={() => navigate("/dashboard/management/details")}
            className="flex items-center gap-2 px-4 py-2 rounded-full
                        border border-orange-500/30 text-orange-400 text-sm"
          >
            <FiEye />
            View Details
          </button>
        </div>
      </div>

      {/* PLAN 2 */}

      <div className="relative rounded-2xl p-6 border border-white/[0.08] bg-[#151313]">
        <div className="flex justify-between items-start gap-3 mb-5">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center
                      text-purple-400 bg-purple-500/10"
          >
            <FiCalendar size={27} />
          </div>

          <span
            className="text-xs font-semibold px-3 py-2 rounded-full border
                      bg-white/10 text-gray-300 border-white/10"
          >
            Completed
          </span>
        </div>

        <h3 className="text-xl font-semibold mb-2">7 Days Study Plan</h3>

        <p className="text-sm text-gray-400 min-h-10 leading-6">
          Focus on DSA and Web Development concepts.
        </p>

        <div className="flex flex-wrap justify-between gap-3 mt-6 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-orange-500" />
            Oct 28, 2026
          </div>

          <div className="flex items-center gap-2">
            <FiClock className="text-gray-400" />7 Days
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-3">Deadline: Nov 4, 2026</div>

        <div className="flex items-center gap-3 mt-6">
          <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full bg-green-500 w-full" />
          </div>

          <span className="text-sm font-semibold">100%</span>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
          <span className="text-sm text-gray-400">14 / 14 Tasks</span>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full
                        border border-orange-500/30 text-orange-400 text-sm"
          >
            <FiEye />
            View Details
          </button>
        </div>
      </div>

      {/* PLAN 3 */}

      <div className="relative rounded-2xl p-6 border border-white/[0.08] bg-[#151313]">
        <div className="flex justify-between items-start gap-3 mb-5">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center
                      text-blue-400 bg-blue-500/10"
          >
            <FiCalendar size={27} />
          </div>

          <span
            className="text-xs font-semibold px-3 py-2 rounded-full border
                      bg-blue-500/10 text-blue-400 border-blue-500/20"
          >
            Paused
          </span>
        </div>

        <h3 className="text-xl font-semibold mb-2">30 Days Dev Plan</h3>

        <p className="text-sm text-gray-400 min-h-10 leading-6">
          Learn MERN Stack in 30 days with projects.
        </p>

        <div className="flex flex-wrap justify-between gap-3 mt-6 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-orange-500" />
            Oct 1, 2026
          </div>

          <div className="flex items-center gap-2">
            <FiClock className="text-gray-400" />
            
            30 Days
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-3">Deadline: Oct 30, 2026</div>

        <div className="flex items-center gap-3 mt-6">
          <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{ width: "45%" }}
            />
          </div>

          <span className="text-sm font-semibold">45%</span>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
          <span className="text-sm text-gray-400">45 / 100 Tasks</span>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full
                        border border-orange-500/30 text-orange-400 text-sm"
          >
            <FiEye />
            View Details
          </button>
        </div>
      </div>

    </div>
  );
};

export default ManagementCard;
