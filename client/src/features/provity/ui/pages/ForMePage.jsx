import React, { useEffect, useState } from "react";
import {
  Plus,
  X,
  Flame,
  Loader2,
  ArrowUpRight,
  Sparkles,
  CalendarDays,
} from "lucide-react";
import { useSelector } from "react-redux";
import { createHabitAPI, getAllHabits } from "../../api/formeAPI";
import BackBtn from "../components/BackBtn";

const ForMePage = () => {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const { accessToken } = useSelector((state) => state.auth);

  // Live Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch All Habits
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await getAllHabits(accessToken);
        setHabits(response.data.habits || []);
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    };

    if (accessToken) fetchHabits();
  }, [accessToken]);

  // Create Habit
  const handleCreateHabit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setLoading(true);

      const response = await createHabitAPI(
        { title: title.trim() },
        accessToken,
      );

      setHabits(response.data.habits || []);
      setTitle("");
      setShowModal(false);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate Duration
  const getDuration = (startedAt) => {
    const difference = Math.max(0, currentTime - new Date(startedAt).getTime());

    return {
      days: Math.floor(difference / 86400000),
      hours: Math.floor((difference / 3600000) % 24),
      minutes: Math.floor((difference / 60000) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  return (
    <main className="min-h-screen w-full bg-[var(--main-bg)] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              FORME<span className="text-[#FC6C26]">.</span>
            </h1>

            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              Become better than yesterday.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <BackBtn />

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FC6C26] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#ff8547] hover:shadow-[0_0_25px_rgba(252,108,38,0.2)] active:scale-95 sm:flex-none sm:px-5"
            >
              <Plus size={18} />
              Add New Habit
            </button>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="relative mt-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#1b1714] via-[#141414] to-[#111111] p-5 sm:mt-10 sm:p-8 lg:p-10">
          {/* Background Glow */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#FC6C26]/[0.08] blur-[100px]" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            {/* Hero Content */}
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-[2px] w-7 bg-[#FC6C26]" />

                <span className="text-[10px] font-bold uppercase tracking-[3px] text-[#FC6C26] sm:text-xs">
                  DO FUCKING WORK.
                </span>
              </div>

              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Become your
                <span className="block text-[#FC6C26]">best self.</span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
                Take control of your habits and make each day count.
              </p>
            </div>

            {/* Reflection CTA */}
            <button
              type="button"
              className="group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-[#FC6C26]/20 bg-white/[0.035] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#FC6C26]/50 hover:bg-[#FC6C26]/[0.06] hover:shadow-[0_10px_40px_rgba(252,108,38,0.08)] sm:p-5 lg:w-[340px]"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FC6C26]/10 blur-3xl transition-all group-hover:bg-[#FC6C26]/20" />

              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#FC6C26]/20 bg-[#FC6C26]/10 text-[#FC6C26]">
                <Sparkles size={22} />
              </div>

              <div className="relative min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#FC6C26]">
                  A Moment of Truth
                </span>

                <h3 className="mt-1 text-sm font-semibold leading-5 text-white sm:text-base">
                  Do You Know Who is Your Biggest Enemy?
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Let's find out. Take a moment to reflect.
                </p>
              </div>

              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition-all duration-300 group-hover:border-[#FC6C26]/40 group-hover:bg-[#FC6C26] group-hover:text-white">
                <ArrowUpRight size={18} />
              </div>
            </button>
          </div>
        </section>

        {/* HABITS SECTION */}
        <section className="mt-10 sm:mt-14">
          {/* Section Header */}
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FC6C26]" />

                <span className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
                  Your Progress
                </span>
              </div>

              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Things I'm Leaving Behind
              </h2>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Every second is a step forward.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2">
              <span className="text-sm font-semibold text-[#FC6C26]">
                {String(habits.length).padStart(2, "0")}
              </span>

              <span className="ml-2 text-xs text-gray-500">Total Habits</span>
            </div>
          </div>

          {/* Empty State */}
          {habits.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.015] px-5 py-16 text-center sm:py-24">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#FC6C26]/20 bg-[#FC6C26]/10 text-[#FC6C26]">
                <Flame size={30} />
              </div>

              <h3 className="text-lg font-bold sm:text-xl">
                Your journey starts here.
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                Choose something you want to leave behind and start building a
                better version of yourself.
              </p>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="mt-7 flex items-center gap-2 rounded-xl bg-[#FC6C26] px-5 py-3 text-sm font-semibold transition-all hover:bg-[#ff8547] active:scale-95"
              >
                <Plus size={17} />
                Add Your First Habit
              </button>
            </div>
          ) : (
            /* Habits Grid */
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {habits.map((habit) => {
                const timer = getDuration(habit.startedAt);

                const timerItems = [
                  { value: timer.days, label: "DAYS" },
                  { value: timer.hours, label: "HOURS" },
                  { value: timer.minutes, label: "MIN" },
                  { value: timer.seconds, label: "SEC" },
                ];

                return (
                  <article
                    key={habit._id}
                    className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FC6C26]/30 hover:bg-white/[0.04] sm:p-6"
                  >
                    {/* Card Glow */}
                    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#FC6C26]/[0.04] blur-3xl transition-all duration-500 group-hover:bg-[#FC6C26]/10" />

                    {/* Card Header */}
                    <div className="relative flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#FC6C26]/15 bg-[#FC6C26]/10 text-[#FC6C26]">
                        <Flame size={23} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold text-white sm:text-lg">
                          {habit.title}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          Stay strong. Keep going.
                        </p>
                      </div>
                    </div>

                    {/* Timer */}
                    <div className="relative mb-7 mt-8 sm:mt-10">
                      <div className="grid grid-cols-4 gap-2 sm:gap-3">
                        {timerItems.map((item) => (
                          <div key={item.label} className="min-w-0 text-center">
                            <div className="rounded-xl border border-white/[0.06] bg-white/[0.035] py-3 sm:py-4">
                              <span className="block text-xl font-bold tabular-nums text-[#FC6C26] sm:text-2xl">
                                {String(item.value).padStart(2, "0")}
                              </span>
                            </div>

                            <p className="mt-2 text-[9px] font-semibold tracking-[1px] text-gray-500 sm:text-[10px]">
                              {item.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="relative flex items-center justify-between border-t border-white/[0.07] pt-4">
                      <div className="flex items-center gap-2 text-gray-500">
                        <CalendarDays size={14} />

                        <span className="text-xs">Started on</span>
                      </div>

                      <span className="text-xs font-medium text-gray-300">
                        {new Date(habit.startedAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="mt-14 border-t border-white/[0.07] py-6 text-center sm:mt-20 sm:text-left">
          <p className="text-xs text-gray-600">
            © 2026 Provity. Stay focused. Keep growing.
          </p>
        </footer>
      </div>

      {/* ADD HABIT MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-md"
          onClick={() => !loading && setShowModal(false)}
        >
          <div
            className="my-auto w-full max-w-md rounded-3xl border border-white/10 bg-[#171717] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#FC6C26]/20 bg-[#FC6C26]/10 text-[#FC6C26]">
                  <Flame size={20} />
                </div>

                <h2 className="text-xl font-bold sm:text-2xl">
                  Start a New Journey
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  What do you want to leave behind?
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white disabled:opacity-40"
              >
                <X size={19} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateHabit} className="mt-7">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Habit Name
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Unnecessary scrolling"
                autoFocus
                maxLength={80}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-[#FC6C26]/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#FC6C26]/10"
              />

              <button
                type="submit"
                disabled={!title.trim() || loading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FC6C26] py-4 text-sm font-semibold text-white transition-all hover:bg-[#ff8547] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Start My Journey
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default ForMePage;
