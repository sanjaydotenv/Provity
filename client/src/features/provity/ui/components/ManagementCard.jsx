import React from "react";
import { FiCalendar, FiClock, FiEye } from "react-icons/fi";
import { useNavigateHook } from "../../hooks/NavigationHook";
import { useManagementHook } from "../../hooks/ManagementHook";
import { useSelector } from "react-redux";

const ManagementCard = ({ allPlans = [] }) => {
  const { navigate } = useNavigateHook();
  const { handleGetPlanAllTasks } = useManagementHook();
  const { accessToken } = useSelector((state) => state.auth);


  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,380px),1fr))]
      gap-5 w-full"
    >
      {allPlans?.map((plan) => (
        <div
          key={plan._id}
          onClick={() => handleGetPlanAllTasks(plan._id , accessToken)}
          className="group relative min-w-0 overflow-hidden
          rounded-2xl border border-orange-500/25
          bg-gradient-to-br from-[#20150f] via-[#171313] to-[#100e0e]
          shadow-[0_0_20px_rgba(249,115,22,0.07)]
          hover:border-orange-500/50
          hover:shadow-[0_0_25px_rgba(249,115,22,0.13)]
          transition-all duration-300 bg-blue-500"
        >
          {/* Top Glow */}
          <div
            className="absolute top-0 left-0 w-40 h-40
          bg-orange-500/[0.06] blur-[70px] pointer-events-none"
          />

          <div className="relative p-5 sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center
              bg-orange-500/10 border border-orange-500/10 text-orange-500"
              >
                <FiCalendar size={27} />
              </div>

              <span
                className="flex items-center gap-2 px-3 py-2 rounded-full
              text-xs font-semibold text-green-400
              bg-green-500/10 border border-green-500/20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Active
              </span>
            </div>

            {/* Title & Description */}
            <div className="mb-6">
              <h3
                className="text-xl sm:text-2xl font-bold text-white
              break-words mb-2 group-hover:text-orange-400 transition-colors"
              >
                {plan?.title}
              </h3>

              <p
                className="text-sm text-gray-400 leading-6
              line-clamp-3 min-h-[72px] break-words"
              >
                {plan?.description || "No description available."}
              </p>
            </div>

            {/* Duration */}
            <div
              className="flex items-center gap-4 p-4 rounded-xl
            bg-orange-500/[0.07] border border-orange-500/15"
            >
              <div
                className="w-11 h-11 shrink-0 rounded-lg
              bg-orange-500/10 flex items-center justify-center
              text-orange-500"
              >
                <FiClock size={21} />
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">Plan Duration</p>

                <h4 className="text-base font-semibold text-white">
                  {plan?.duration} Days Plan
                </h4>
              </div>
            </div>

            {/* Date Information */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {/* Start Date */}
              <div
                className="p-4 rounded-xl bg-white/[0.035]
              border border-white/[0.07] min-w-0"
              >
                <p className="text-xs text-gray-500 mb-3">Start Date</p>

                <div className="flex items-center gap-2 min-w-0">
                  <FiCalendar className="text-orange-500 shrink-0" size={16} />

                  <span className="text-sm font-semibold text-gray-200 truncate">
                    {formatDate(plan?.startDate)}
                  </span>
                </div>
              </div>

              {/* End Date */}
              <div
                className="p-4 rounded-xl bg-white/[0.035]
              border border-white/[0.07] min-w-0"
              >
                <p className="text-xs text-gray-500 mb-3">End Date</p>

                <div className="flex items-center gap-2 min-w-0">
                  <FiCalendar className="text-orange-500 shrink-0" size={16} />

                  <span className="text-sm font-semibold text-gray-200 truncate">
                    {formatDate(plan?.endDate)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="flex justify-between items-center gap-3 mt-6 pt-5
            border-t border-white/10"
            >
              <span className="text-xs sm:text-sm text-gray-500">
                Your Productivity Plan
              </span>

              <button
                onClick={() =>
                  navigate("/dashboard/management/details", {
                    state: { plan },
                  })
                }
                className="shrink-0 flex items-center gap-2 px-4 py-2.5
                rounded-full border border-orange-500/30
                text-orange-400 text-sm font-medium
                hover:bg-orange-500 hover:text-white
                hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]
                transition-all duration-300"
              >
                <FiEye size={16} />
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManagementCard;
