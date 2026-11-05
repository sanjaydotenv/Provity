import React from "react";
import { useNavigate } from "react-router";

import {
  FiArrowLeft,
  FiPlus,
  FiSearch,
  FiCalendar,
  FiLayers,
} from "react-icons/fi";
import ManagementCard from "../components/ManagementCard";
import ManagementTrackerCard from "../components/ManagementTrackerCard";
import { useNavigateHook } from "../../hooks/NavigationHook";
const ManagementPage = () => {
  const { navigate } = useNavigateHook();

  return (
    <div className="min-h-screen bg-[#080808] text-white px-5 md:px-10 py-7">
      <div className="max-w-[1600px] mx-auto">
        {/* BACK BUTTON */}

        <button
        onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-5 py-3 rounded-full
          border border-white/10 bg-white/[0.04] hover:bg-white/10
          text-gray-300 transition-all mb-9"
        >
          <FiArrowLeft />
          Back
        </button>

        {/* HEADER */}

        <div className="flex flex-wrap justify-between items-center gap-5 mb-10">
          <div className="flex items-center gap-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center
            bg-orange-500/10 border border-orange-500/20"
            >
              <FiCalendar className="text-orange-500 text-3xl" />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Manage<span className="text-orange-500">ment</span>
              </h1>

              <p className="text-gray-400 mt-1">
                Plan your tasks, organize your days and stay productive.
              </p>
            </div>
          </div>

          <button
            className="flex items-center gap-2 px-6 py-4 rounded-xl
            bg-gradient-to-r from-orange-500 to-orange-600
            text-black font-semibold"
          >
            <FiPlus size={20} />
            Create New Plan
          </button>
        </div>

        {/* MAIN CONTENT */}

        <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr] gap-7">
          {/* LEFT SIDE - ALL PLANS */}

          <section>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <FiLayers className="text-orange-500 text-3xl" />

                <div>
                  <h2 className="text-xl font-semibold">Your Plans</h2>

                  <p className="text-sm text-gray-500">
                    Manage all your task plans here
                  </p>
                </div>
              </div>

              <div className="relative w-full sm:w-64">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type="text"
                  placeholder="Search plans..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl
                  bg-[#171515] border border-white/10 outline-none
                  focus:border-orange-500/50 text-sm"
                />
              </div>
            </div>

            {/* PLANS GRID */}

            <div>
              <ManagementCard />
            </div>
          </section>

          {/* RIGHT SIDE - PLAN DETAILS */}

          <div>
            <ManagementTrackerCard />
          </div>
        </div>
      </div>

      {/* SCROLLBAR */}
    </div>
  );
};

export default ManagementPage;
