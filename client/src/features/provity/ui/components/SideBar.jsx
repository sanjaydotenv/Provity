import React from "react";
import { GiCrystalGrowth } from "react-icons/gi";
import { useDashboardHook } from "../../hooks/DashboardHook";
import ProvityLogo from "./ProvityLogo";
import { IoClose, IoHome } from "react-icons/io5";
import { useNavigateHook } from "../../hooks/NavigationHook";
import { FiArrowUpRight, FiPlus } from "react-icons/fi";

const SideBar = ({data}) => {
  const { sidebarOpen, setSidebarOpen } = useDashboardHook();
  const { navigate } = useNavigateHook();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-white/[0.08] bg-[#0A0B0D] px-5 py-7 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:w-[230px] lg:shrink-0 lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="hidden lg:block">
        <ProvityLogo />
      </div>

      <div className="mb-8 mt-8 flex items-center justify-between lg:hidden">
        <ProvityLogo />

        <button
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
          className="text-2xl text-white/60"
        >
          <IoClose />
        </button>
      </div>

      <div className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[2.5px] text-white/30 lg:mt-14">
        Workspace
      </div>

      <nav className="flex flex-col gap-2">
        <button
          onClick={() => setSidebarOpen(false)}
          className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-[#FC6C26]/20 bg-gradient-to-r from-[#FC6C26]/20 to-[#FC6C26]/[0.04] px-4 py-3.5 text-left text-sm font-medium text-white"
        >
          <span className="absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-[#FC6C26]" />
          <IoHome className="text-lg text-[#FC6C26]" />
          Dashboard
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#FC6C26] shadow-[0_0_10px_#FC6C26]" />
        </button>

        <button
          onClick={() => {
            setSidebarOpen(false);
            navigate("/dashboard/flow");
          }}
          className="flex items-center gap-3 rounded-xl border border-transparent px-4 py-3.5 text-left text-sm text-white/55 transition hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-white"
        >
          <FiPlus className="text-lg" />
          Today Flow
          <FiArrowUpRight className="ml-auto text-white/25" />
        </button>

        <button
          onClick={() => {
            setSidebarOpen(false);
            navigate("/dashboard/management");
          }}
          className="flex items-center gap-3 rounded-xl border border-transparent px-4 py-3.5 text-left text-sm text-white/55 transition hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-white"
        >
          <GiCrystalGrowth />
          Management
          <FiArrowUpRight className="ml-auto text-white/25" />
        </button>
      </nav>

      {/* Sidebar Progress */}
      <div className="mt-auto">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#181310] to-[#101113] p-4">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#FC6C26]/10 blur-2xl" />

          <div className="relative flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#FC6C26]" />

            <p className="text-[10px] font-medium uppercase tracking-[1.5px] text-white/50">
              Daily Progress
            </p>
          </div>

          <div className="relative mt-4 flex items-end justify-between">
            <p className="text-3xl font-semibold tracking-tight">
              {data?.completed}
              <span className="text-base font-normal text-white/35">
                {/* /{progressValue?.total} */}
              </span>
            </p>

            <p className="pb-1 text-xs text-[#FC6C26]">
              {Math.round(data?.progress)}%
            </p>
          </div>

          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-[#FC6C26] transition-all"
                style={{ width: `${data?.progress ?? 0}%` }}
            />
          </div>

          <p className="mt-3 text-[11px] text-white/35">Keep moving forward.</p>
        </div>

        <div className="mt-5 border-t border-white/[0.07] pt-4">
          <p className="text-center text-[10px] tracking-wide text-white/20">
            PROVITY · YOUR DAILY WORKSPACE
          </p>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
