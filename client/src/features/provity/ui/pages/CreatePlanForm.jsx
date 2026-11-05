import React, { useState } from "react";

import {
  FiArrowLeft,
  FiCalendar,
  FiFlag,
  FiFileText,
  FiLayers,
  FiX,
  FiCheck,
  FiEdit3,
} from "react-icons/fi";

import { useNavigateHook } from "../../hooks/NavigationHook";
import ProvityLogo from "../components/ProvityLogo";
import { useManagementHook } from "../../hooks/ManagementHook";

const CreatePlanForm = () => {
  const { navigate } = useNavigateHook();

  const {
    durations,
    planData,
    handlePlanData,
    handleDurationSelect,
    handleCustomDuration,
    handleCreatePlan,
  } = useManagementHook();

  const [isCustom, setIsCustom] = useState(false);

  const inputStyle =
    "w-full bg-[#111111] border border-[#292929] rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#FC6C26] transition-all";

  const labelStyle = "block text-sm text-gray-300 mb-2 font-medium";

  // Pre-built Duration
  const handlePrebuiltSelect = (days) => {
    setIsCustom(false);
    handleDurationSelect(days);
  };

  // Custom Duration
  const handleCustomSelect = () => {
    setIsCustom(true);
    handleCustomDuration();
  };

  const activeDuration = Number(planData.duration) || 0;

  return (
    <div className="w-full bg-[#080808] text-white px-5 py-4 md:px-8">
      <div className="max-w-[1400px] h-full mx-auto flex flex-col">
        <ProvityLogo />

        {/* Back Button */}
        <div className="shrink-0 mb-4 self-end">
          <button
            type="button"
            onClick={() => navigate("/dashboard/management")}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#FC6C26] transition"
          >
            <FiArrowLeft />
            Back to Management
          </button>
        </div>

        {/* Header */}
        <div className="shrink-0 flex items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 text-[#FC6C26] text-xs font-semibold uppercase tracking-widest mb-2">
              <FiLayers />
              Plan Management
            </div>

            <h1 className="text-2xl md:text-3xl font-bold">Create New Plan</h1>

            <p className="text-gray-500 text-sm mt-1">
              Define your goals and organize your schedule.
            </p>
          </div>

          <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-[#FC6C26]/10 border border-[#FC6C26]/20 items-center justify-center text-[#FC6C26]">
            <FiFlag size={22} />
          </div>
        </div>

        {/* Form */}
        <form
          className="flex-1 min-h-0 flex flex-col"
          onSubmit={handleCreatePlan}
        >
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Plan Information */}
            <section className="bg-[#101010] border border-[#252525] rounded-2xl p-5 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#FC6C26]/10 flex items-center justify-center text-[#FC6C26]">
                  <FiFileText size={19} />
                </div>

                <div>
                  <h2 className="font-semibold">Plan Information</h2>

                  <p className="text-xs text-gray-500">
                    Basic details about your plan
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Plan Title */}
                <div>
                  <label className={labelStyle}>
                    Plan Title <span className="text-[#FC6C26]">*</span>
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={planData.title}
                    onChange={handlePlanData}
                    placeholder="e.g. 15 Days MERN Stack Plan"
                    className={inputStyle}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className={labelStyle}>Description</label>

                  <textarea
                    name="description"
                    value={planData.description}
                    onChange={handlePlanData}
                    rows={5}
                    placeholder="Describe what you want to achieve with this plan..."
                    className={`${inputStyle} resize-none`}
                  />
                </div>
              </div>

              <div className="mt-auto pt-5">
                <div className="rounded-xl bg-[#FC6C26]/5 border border-[#FC6C26]/15 p-4">
                  <div className="flex items-center gap-2 text-[#FC6C26] text-sm font-medium mb-1">
                    <FiFlag />
                    Stay focused
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    Create a clear plan with a specific goal. You can organize
                    individual tasks after creating your plan.
                  </p>
                </div>
              </div>
            </section>

            {/* Schedule Information */}
            <section className="bg-[#101010] border border-[#252525] rounded-2xl p-5 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#FC6C26]/10 flex items-center justify-center text-[#FC6C26]">
                  <FiCalendar size={19} />
                </div>

                <div>
                  <h2 className="font-semibold">Plan Schedule</h2>

                  <p className="text-xs text-gray-500">
                    Configure your plan duration
                  </p>
                </div>
              </div>

              {/* Pre-built Duration */}
              <div className="mb-5">
                <label className={labelStyle}>Select Plan Duration</label>

                <div className="grid grid-cols-4 gap-2">
                  {durations.map((days) => {
                    const isActive = !isCustom && planData.duration === days;

                    return (
                      <button
                        key={days}
                        type="button"
                        onClick={() => handlePrebuiltSelect(days)}
                        className={`relative rounded-xl border py-3 transition-all ${
                          isActive
                            ? "bg-[#FC6C26]/10 border-[#FC6C26] text-[#FC6C26]"
                            : "bg-[#151515] border-[#292929] text-gray-400 hover:border-[#FC6C26]/50 hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <FiCheck
                            className="absolute top-1.5 right-1.5"
                            size={12}
                          />
                        )}

                        <span className="block text-lg font-bold">{days}</span>

                        <span className="text-[10px] uppercase tracking-wider">
                          Days
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Duration */}
              <div className="mb-5">
                <button
                  type="button"
                  onClick={handleCustomSelect}
                  className={`w-full flex items-center justify-between rounded-xl border p-3 transition-all ${
                    isCustom
                      ? "border-[#FC6C26] bg-[#FC6C26]/10"
                      : "border-[#292929] bg-[#151515] hover:border-[#FC6C26]/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#FC6C26]/10 flex items-center justify-center text-[#FC6C26]">
                      <FiEdit3 />
                    </div>

                    <div className="text-left">
                      <p
                        className={`text-sm font-medium ${
                          isCustom ? "text-[#FC6C26]" : "text-white"
                        }`}
                      >
                        Custom Duration
                      </p>

                      <p className="text-xs text-gray-500">
                        Choose your own number of days
                      </p>
                    </div>
                  </div>

                  {isCustom && <FiCheck className="text-[#FC6C26]" />}
                </button>

                {isCustom && (
                  <div className="mt-3">
                    <label className={labelStyle}>Enter Custom Days</label>

                    <div className="relative">
                      <input
                        type="number"
                        name="duration"
                        min="1"
                        value={planData.duration}
                        onChange={handlePlanData}
                        placeholder="e.g. 21"
                        className={`${inputStyle} pr-16`}
                        required
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                        Days
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-2 gap-3">
                {/* Start Date */}
                <div>
                  <label className={labelStyle}>
                    Start Date <span className="text-[#FC6C26]">*</span>
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={planData.startDate}
                    onChange={handlePlanData}
                    className={`${inputStyle} [color-scheme:dark] px-3`}
                    required
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className={labelStyle}>
                    End Date <span className="text-[#FC6C26]">*</span>
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={planData.endDate}
                    readOnly
                    placeholder="Auto calculated"
                    className={`${inputStyle} [color-scheme:dark] px-3 cursor-not-allowed opacity-70`}
                    required
                  />
                </div>
              </div>

              {/* Schedule Overview */}
              <div className="mt-auto pt-5">
                <div className="rounded-xl bg-[#171717] border border-[#292929] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">
                      Schedule Overview
                    </span>

                    <FiCalendar className="text-[#FC6C26]" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Duration</p>

                      <p className="text-lg font-semibold">
                        {activeDuration > 0 ? `${activeDuration} Days` : "--"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Plan Type</p>

                      <p className="text-lg font-semibold">
                        {isCustom ? "Custom" : "Pre-built"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Buttons */}
          <div className="shrink-0 flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/management")}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#303030] text-gray-400 hover:text-white hover:bg-[#171717] transition text-sm"
            >
              <FiX />
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FC6C26] hover:bg-[#e85d1b] text-white font-semibold text-sm transition shadow-lg shadow-[#FC6C26]/10"
            >
              <FiFlag />
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlanForm;
