import React, { useEffect, useState } from "react";
import ProvityLogo from "../components/ProvityLogo";

import {
  IoHome,
  IoCalendarOutline,
  IoTimeOutline,
  IoMenu,
  IoClose,
  IoArrowUpOutline,
} from "react-icons/io5";

import {
  FiPlus,
  FiCheckCircle,
  FiClock,
  FiClipboard,
  FiTrendingUp,
  FiArrowUpRight,
  FiMoreHorizontal,
  FiCalendar,
} from "react-icons/fi";
import { useNavigateHook } from "../../hooks/NavigationHook";

const ORANGE = "#FC6C26";

const DAY_MS = 24 * 60 * 60 * 1000;

const getTimeData = (now) => {
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  // Month calculations
  const monthStart = new Date(year, month, 1);
  const nextMonthStart = new Date(year, month + 1, 1);

  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const currentDay = date;

  const daysPassedInMonth = currentDay;
  const daysRemainingInMonth = totalDaysInMonth - currentDay;

  const monthElapsed =
    ((now.getTime() - monthStart.getTime()) /
      (nextMonthStart.getTime() - monthStart.getTime())) *
    100;

  const monthRemaining = 100 - monthElapsed;

  // Year calculations
  const yearStart = new Date(year, 0, 1);
  const nextYearStart = new Date(year + 1, 0, 1);

  const totalDaysInYear = Math.round(
    (nextYearStart.getTime() - yearStart.getTime()) / DAY_MS,
  );

  const dayOfYear =
    Math.floor((now.getTime() - yearStart.getTime()) / DAY_MS) + 1;

  const daysRemainingInYear = Math.max(0, totalDaysInYear - dayOfYear);

  const yearElapsed =
    ((now.getTime() - yearStart.getTime()) /
      (nextYearStart.getTime() - yearStart.getTime())) *
    100;

  const yearRemaining = 100 - yearElapsed;

  // Day calculations
  const dayStart = new Date(year, month, date);
  const nextDayStart = new Date(year, month, date + 1);

  const totalHoursInDay =
    (nextDayStart.getTime() - dayStart.getTime()) / 3600000;

  const elapsedMilliseconds = now.getTime() - dayStart.getTime();

  const remainingMilliseconds = Math.max(
    0,
    nextDayStart.getTime() - now.getTime(),
  );

  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

  const remainingSeconds = Math.floor(remainingMilliseconds / 1000);

  const elapsedHours = elapsedMilliseconds / 3600000;

  const remainingHours = remainingMilliseconds / 3600000;

  const dayElapsed =
    (elapsedMilliseconds / (nextDayStart.getTime() - dayStart.getTime())) * 100;

  const dayRemaining = 100 - dayElapsed;

  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours,
      minutes,
      seconds,
      text: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0",
      )}:${String(seconds).padStart(2, "0")}`,
    };
  };

  return {
    month: {
      total: totalDaysInMonth,
      elapsed: daysPassedInMonth,
      remaining: daysRemainingInMonth,
      progress: monthElapsed,
      remainingProgress: monthRemaining,
    },

    year: {
      total: totalDaysInYear,
      elapsed: dayOfYear,
      remaining: daysRemainingInYear,
      progress: yearElapsed,
      remainingProgress: yearRemaining,
    },

    day: {
      total: totalHoursInDay,
      elapsed: elapsedHours,
      remaining: remainingHours,
      progress: dayElapsed,
      remainingProgress: dayRemaining,
      elapsedDuration: formatDuration(elapsedSeconds),
      remainingDuration: formatDuration(remainingSeconds),
    },
  };
};

const DashboardPage = () => {
  const [now, setNow] = useState(() => new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { navigate } = useNavigateHook();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeData = getTimeData(now);

  const today = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const weekday = now.toLocaleDateString("en-IN", {
    weekday: "long",
  });

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Demo task data: replace with actual task data when connecting your API.
  const stats = [
    {
      label: "Today's Tasks",
      value: 0,
      subtitle: "Tasks scheduled for today",
      icon: FiClipboard,
      accent: "orange",
    },
    {
      label: "Completed",
      value: 0,
      subtitle: "Tasks finished successfully",
      icon: FiCheckCircle,
      accent: "green",
    },
    {
      label: "Pending Tasks",
      value: 0,
      subtitle: "Tasks waiting for you",
      icon: FiClock,
      accent: "yellow",
    },
    {
      label: "Total Tasks",
      value: 0,
      subtitle: "Your overall workload",
      icon: FiTrendingUp,
      accent: "purple",
    },
  ];

  const flows = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Daily Flow ${String(i + 1).padStart(2, "0")}`,
    total: 7,
    completed: 5,
    pending: 2,
    date: "22 Oct 2026",
  }));

  const totalTasks = 8;
  const completedTasks = 0;

  const taskProgress =
    totalTasks > 0 ? Math.min(100, (completedTasks / totalTasks) * 100) : 0;

  const countdowns = [
    {
      title: "MONTH END",
      value: timeData.month.remaining,
      total: timeData.month.total,
      elapsed: timeData.month.elapsed,
      remaining: timeData.month.remaining,
      unit: "days remaining",
      icon: FiCalendar,
      progress: timeData.month.progress,
      remainingProgress: timeData.month.remainingProgress,
      detail: `${timeData.month.elapsed} of ${timeData.month.total} days passed`,
      remainingDetail: `${timeData.month.remaining} days left`,
    },
    {
      title: "YEAR END",
      value: timeData.year.remaining,
      total: timeData.year.total,
      elapsed: timeData.year.elapsed,
      remaining: timeData.year.remaining,
      unit: "days remaining",
      icon: IoCalendarOutline,
      progress: timeData.year.progress,
      remainingProgress: timeData.year.remainingProgress,
      detail: `${timeData.year.elapsed} of ${timeData.year.total} days passed`,
      remainingDetail: `${timeData.year.remaining} days left`,
    },
    {
      title: "DAY END",
      value: timeData.day.remainingDuration.hours,
      total: 24,
      elapsed: timeData.day.elapsed,
      remaining: timeData.day.remaining,
      unit: "hours remaining",
      icon: IoTimeOutline,
      progress: timeData.day.progress,
      remainingProgress: timeData.day.remainingProgress,
      detail: `${timeData.day.elapsedDuration.text} elapsed`,
      remainingDetail: `${timeData.day.remainingDuration.text} left`,
    },
  ];

  const accentClasses = {
    orange: "text-[#FC6C26] bg-[#FC6C26]/10 border-[#FC6C26]/20",
    green: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    yellow: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    purple: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#08090B] text-white selection:bg-[#FC6C26]/30">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-60 left-[25%] h-[420px] w-[420px] rounded-full bg-[#FC6C26]/[0.055] blur-[140px]" />
        <div className="absolute right-[-200px] top-[45%] h-[380px] w-[380px] rounded-full bg-orange-500/[0.035] blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 0.6px, transparent 0.6px)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex h-[70px] items-center justify-between border-b border-white/[0.08] bg-[#08090B]/90 px-5 backdrop-blur-2xl lg:hidden">
        <ProvityLogo />

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xl transition hover:border-[#FC6C26]/50"
        >
          {sidebarOpen ? <IoClose /> : <IoMenu />}
        </button>
      </header>

      <div className="relative flex min-h-screen">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <button
            aria-label="Close sidebar"
            onClick={() => {
              setSidebarOpen(false);
              navigate("/dashboard/flow");
            }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Sidebar */}
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
                setSidebarOpen(false)
                navigate("/dashboard/flow")
              }}
              className="flex items-center gap-3 rounded-xl border border-transparent px-4 py-3.5 text-left text-sm text-white/55 transition hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-white"
            >
              <FiPlus className="text-lg" />
              Today Flow
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
                  {completedTasks}
                  <span className="text-base font-normal text-white/35">
                    /{totalTasks}
                  </span>
                </p>

                <p className="pb-1 text-xs text-[#FC6C26]">
                  {Math.round(taskProgress)}%
                </p>
              </div>

              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full bg-[#FC6C26] transition-all"
                  style={{ width: `${taskProgress}%` }}
                />
              </div>

              <p className="mt-3 text-[11px] text-white/35">
                Keep moving forward.
              </p>
            </div>

            <div className="mt-5 border-t border-white/[0.07] pt-4">
              <p className="text-center text-[10px] tracking-wide text-white/20">
                PROVITY · YOUR DAILY WORKSPACE
              </p>
            </div>
          </div>
        </aside>

        {/* Main Dashboard */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-10">
          <div className="mx-auto max-w-[1500px]">
            {/* Page Heading */}
            <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-px w-6 bg-[#FC6C26]" />

                  <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#FC6C26]">
                    Your Workspace
                  </p>
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Dashboard
                  <span className="text-[#FC6C26]">.</span>
                </h1>

                <p className="mt-2 text-sm text-white/40">
                  A little progress every day adds up.
                </p>
              </div>

              <div className="flex items-center gap-3 self-start rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 sm:self-auto">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FC6C26]/10">
                  <IoCalendarOutline className="text-lg text-[#FC6C26]" />
                </div>

                <div>
                  <p className="text-xs font-medium">{today}</p>
                  <p className="mt-0.5 text-[10px] text-white/40">{weekday}</p>
                </div>
              </div>
            </section>

            {/* Date and Time */}
            <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#171311] via-[#121212] to-[#0E0F11] p-5 sm:p-6">
                <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-[#FC6C26]/[0.08] blur-3xl transition group-hover:bg-[#FC6C26]/[0.14]" />

                <div className="relative flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#FC6C26]/20 bg-[#FC6C26]/[0.08]">
                    <FiCalendar className="text-2xl text-[#FC6C26]" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[2px] text-white/40">
                      Today's Date
                    </p>

                    <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                      {today}
                    </h2>

                    <p className="mt-1 text-xs text-white/40">{weekday}</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#171311] via-[#121212] to-[#0E0F11] p-5 sm:p-6">
                <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-[#FC6C26]/[0.08] blur-3xl transition group-hover:bg-[#FC6C26]/[0.14]" />

                <div className="relative flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#FC6C26]/20 bg-[#FC6C26]/[0.08]">
                    <IoTimeOutline className="text-3xl text-[#FC6C26]" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[2px] text-white/40">
                      Current Time
                    </p>

                    <h2 className="mt-1 whitespace-nowrap text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
                      {time}
                    </h2>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>

                      <p className="text-[10px] text-white/40">
                        Live local time
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Time Overview */}
            <section className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold">Time Overview</h2>

                  <p className="mt-1 text-xs text-white/35">
                    Track elapsed time and what's remaining.
                  </p>
                </div>

                <span className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-[10px] text-white/40">
                  LIVE
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {countdowns.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111214] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#FC6C26]/30 hover:bg-[#151414]"
                    >
                      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#FC6C26]/[0.04] blur-2xl transition group-hover:bg-[#FC6C26]/10" />

                      <div className="relative flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] font-medium tracking-[1.8px] text-white/40">
                            {item.title}
                          </p>

                          <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-4xl font-semibold tracking-tight">
                              {item.value}
                            </span>

                            <span className="text-xs text-white/40">
                              {item.unit}
                            </span>
                          </div>

                          <p className="mt-2 text-xs text-[#FC6C26]">
                            {item.remainingDetail}
                          </p>
                        </div>

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#FC6C26]/15 bg-[#FC6C26]/[0.08]">
                          <Icon className="text-xl text-[#FC6C26]" />
                        </div>
                      </div>

                      {/* Elapsed / Remaining */}
                      <div className="relative mt-5 flex items-center justify-between gap-2">
                        <p className="text-[10px] text-white/40">
                          {item.detail}
                        </p>

                        <p className="shrink-0 text-xs font-medium text-white/70">
                          {item.progress.toFixed(1)}%
                        </p>
                      </div>

                      {/* Real elapsed progress */}
                      <div
                        className="relative mt-2 h-2 overflow-hidden rounded-full bg-white/[0.07]"
                        role="progressbar"
                        aria-label={`${item.title} elapsed`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Number(item.progress.toFixed(1))}
                      >
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#FC6C26] to-[#FF9B62] transition-[width] duration-700"
                          style={{
                            width: `${Math.min(100, Math.max(0, item.progress))}%`,
                          }}
                        />
                      </div>

                      {/* Remaining progress */}
                      <div className="relative mt-3 flex items-center justify-between gap-2">
                        <p className="text-[10px] text-white/35">
                          Time remaining
                        </p>

                        <p className="text-[10px] text-white/50">
                          {item.remainingProgress.toFixed(1)}%
                        </p>
                      </div>

                      <div className="relative mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                        <div
                          className="h-full rounded-full bg-emerald-400/70 transition-[width] duration-700"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(0, item.remainingProgress),
                            )}%`,
                          }}
                        />
                      </div>

                      {/* Day-specific precise countdown */}
                      {item.title === "DAY END" && (
                        <div className="relative mt-4 rounded-xl border border-white/[0.07] bg-black/20 p-3">
                          <p className="mb-2 text-[9px] uppercase tracking-[1.5px] text-white/35">
                            Exact countdown
                          </p>

                          <p className="font-mono text-xl font-medium tracking-wider text-white sm:text-2xl">
                            {timeData.day.remainingDuration.text}
                          </p>

                          <p className="mt-1 text-[10px] text-white/35">
                            HH : MM : SS remaining today
                          </p>
                        </div>
                      )}

                      {/* Total duration */}
                      <div className="relative mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3">
                        <p className="text-[10px] text-white/35">
                          Total duration
                        </p>

                        <p className="text-xs font-medium text-white/65">
                          {item.total}{" "}
                          {item.title === "DAY END" ? "hours" : "days"}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Task Overview */}
            <section className="mb-9">
              <div className="mb-4">
                <h2 className="text-base font-semibold">Task Overview</h2>

                <p className="mt-1 text-xs text-white/35">
                  Your productivity at a glance.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <article
                      key={stat.label}
                      className="group rounded-2xl border border-white/[0.08] bg-[#111214] p-5 transition duration-300 hover:border-white/[0.15] hover:bg-[#151618]"
                    >
                      <div className="flex items-start justify-between">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl border ${accentClasses[stat.accent]}`}
                        >
                          <Icon className="text-xl" />
                        </div>

                        <button
                          aria-label={`${stat.label} options`}
                          className="rounded-lg p-1.5 text-white/20 transition hover:bg-white/[0.05] hover:text-white/70"
                        >
                          <FiMoreHorizontal className="text-xl" />
                        </button>
                      </div>

                      <p className="mt-5 text-sm text-white/50">{stat.label}</p>

                      <div className="mt-1 flex items-end justify-between gap-2">
                        <span className="text-4xl font-semibold tracking-tight">
                          {stat.value}
                        </span>

                        <FiArrowUpRight className="mb-1 text-lg text-white/20 transition group-hover:text-[#FC6C26]" />
                      </div>

                      <p className="mt-3 text-[11px] text-white/30">
                        {stat.subtitle}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Daily Flow */}
            <section>
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-px w-5 bg-[#FC6C26]" />

                    <p className="text-[10px] font-medium uppercase tracking-[2px] text-[#FC6C26]">
                      Stay Consistent
                    </p>
                  </div>

                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Your{" "}
                    <span className="font-normal italic text-[#FC6C26]">
                      Daily Flow
                    </span>
                  </h2>

                  <p className="mt-2 text-xs text-white/35">
                    Small steps. Consistent progress.
                  </p>
                </div>

                <button className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-[#FC6C26]/30 bg-[#FC6C26]/[0.07] px-4 py-2.5 text-xs font-medium text-[#FC6C26] transition hover:bg-[#FC6C26]/15 sm:self-auto">
                  <FiPlus className="text-base" />
                  Create New Flow
                </button>
              </div>

              <div className="grid grid-cols-1 items-stretch gap-5 2xl:grid-cols-[minmax(0,1fr)_280px]">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {flows.map((flow) => {
                    const flowProgress =
                      flow.total > 0
                        ? Math.min(100, (flow.completed / flow.total) * 100)
                        : 0;

                    return (
                      <article
                        key={flow.id}
                        className="group rounded-2xl border border-white/[0.08] bg-[#111214] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#FC6C26]/30 hover:bg-[#151516]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-2.5">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#FC6C26]/15 bg-[#FC6C26]/[0.07]">
                              <IoCalendarOutline className="text-base text-[#FC6C26]" />
                            </div>

                            <div className="min-w-0">
                              <h3 className="truncate text-xs font-medium text-white/90">
                                {flow.title}
                              </h3>

                              <p className="mt-1 text-[10px] text-white/35">
                                {flow.date}
                              </p>
                            </div>
                          </div>

                          <button
                            aria-label={`More options for ${flow.title}`}
                            className="shrink-0 text-white/25 transition hover:text-white"
                          >
                            <FiMoreHorizontal className="text-xl" />
                          </button>
                        </div>

                        <div className="my-4 h-px bg-white/[0.07]" />

                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <p className="text-lg font-semibold">
                              {flow.total}
                            </p>

                            <p className="mt-1 text-[9px] text-white/35 sm:text-[10px]">
                              Total
                            </p>
                          </div>

                          <div>
                            <p className="text-lg font-semibold text-emerald-400">
                              {flow.completed}
                            </p>

                            <p className="mt-1 text-[9px] text-white/35 sm:text-[10px]">
                              Completed
                            </p>
                          </div>

                          <div>
                            <p className="text-lg font-semibold text-amber-400">
                              {flow.pending}
                            </p>

                            <p className="mt-1 text-[9px] text-white/35 sm:text-[10px]">
                              Pending
                            </p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-[10px] text-white/35">
                              Progress
                            </span>

                            <span className="text-[10px] font-medium text-[#FC6C26]">
                              {Math.round(flowProgress)}%
                            </span>
                          </div>

                          <div className="h-1 overflow-hidden rounded-full bg-white/[0.07]">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#FC6C26] to-[#FF9B62]"
                              style={{ width: `${flowProgress}%` }}
                            />
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Overall Progress */}
                <aside className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#FC6C26]/20 bg-gradient-to-b from-[#19130F] via-[#111112] to-[#101113] p-6 sm:p-8">
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#FC6C26]/[0.09] blur-[70px]" />

                  <div className="relative mb-5 flex w-full items-center justify-between">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[2px] text-white/40">
                        Overview
                      </p>

                      <h3 className="mt-1 text-base font-semibold">
                        Daily Target
                      </h3>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FC6C26]/20 bg-[#FC6C26]/10">
                      <FiTrendingUp className="text-lg text-[#FC6C26]" />
                    </div>
                  </div>

                  <div
                    className="relative flex h-44 w-44 items-center justify-center rounded-full"
                    style={{
                      background: `conic-gradient(${ORANGE} ${taskProgress * 3.6}deg, rgba(255,255,255,0.07) 0deg)`,
                    }}
                  >
                    <div className="flex h-[calc(100%-12px)] w-[calc(100%-12px)] flex-col items-center justify-center rounded-full border border-white/[0.06] bg-[#111112]">
                      <p className="text-4xl font-semibold tracking-tight">
                        {Math.round(taskProgress)}
                        <span className="text-xl text-[#FC6C26]">%</span>
                      </p>

                      <p className="mt-1 text-[10px] uppercase tracking-[1.5px] text-white/35">
                        Completed
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-6 grid w-full grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                        <p className="text-[10px] text-white/40">Completed</p>
                      </div>

                      <p className="mt-2 text-xl font-semibold">
                        {completedTasks}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FC6C26]" />

                        <p className="text-[10px] text-white/40">Remaining</p>
                      </div>

                      <p className="mt-2 text-xl font-semibold">
                        {Math.max(0, totalTasks - completedTasks)}
                      </p>
                    </div>
                  </div>

                  <p className="relative mt-5 text-center text-xs leading-5 text-white/35">
                    Every completed task brings you closer to your goal.
                  </p>
                </aside>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-10 flex flex-col justify-between gap-2 border-t border-white/[0.07] py-5 text-[10px] text-white/25 sm:flex-row sm:items-center">
              <p>© {now.getFullYear()} Provity. Stay focused. Keep growing.</p>

              <p className="flex items-center gap-1.5">
                Crafted for productivity
                <IoArrowUpOutline className="-rotate-45 text-[#FC6C26]" />
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
