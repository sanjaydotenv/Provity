import React, { useEffect, useState } from "react";
import { Plus, X, Flame, Loader2 } from "lucide-react";
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

  // Create Habit
  const handleCreateHabit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setLoading(true);

      const response = await createHabitAPI({ title }, accessToken);

      setHabits(response.data.habits);
      setTitle("");
      setShowModal(false);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAllHabits = async () => {
    const response = await getAllHabits(accessToken);

    setHabits(response.data.habits);
  };

  useEffect(() => {
    handleAllHabits();
  }, [accessToken]);

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
    <div className="min-h-screen w-full bg-[var(--main-bg)] text-white px-6 py-8">
      {/* HEADER */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            FORME<span className="text-[#FC6C26]">.</span>
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Become better than yesterday.
          </p>
        </div>

        <div className="flex items-center  gap-5">
          <BackBtn />

          <button
            onClick={() => setShowModal(true)}
            className="absolute bottom-10 right-10 flex items-center gap-2 bg-[#FC6C26] hover:bg-[#ff8547] transition px-5 py-3 rounded-xl text-sm font-semibold"
          >
            <Plus size={18} />
            Add New Habit
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-sm text-gray-400 tracking-widest">
          YOUR PERSONAL JOURNEY
        </p>

        <h2 className="text-4xl font-bold mt-3">
          Become your <span className="text-[#FC6C26]">best self.</span>
        </h2>

        <p className="text-gray-400 mt-3 max-w-lg">
          Every habit you leave behind brings you one step closer to the person
          you want to become.
        </p>
      </section>

      {/* HABITS */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Things I'm Leaving Behind</h2>

            <p className="text-sm text-gray-400 mt-1">
              Every second is a step forward.
            </p>
          </div>

          <span className="text-sm text-gray-400">{habits.length} Habits</span>
        </div>

        {habits.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-3xl py-20 text-center">
            <Flame size={40} className="mx-auto text-[#FC6C26] mb-4" />

            <h3 className="text-xl font-semibold">Your journey starts here.</h3>

            <p className="text-sm text-gray-400 mt-2">
              Choose something you want to leave behind.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="mt-6 bg-[#FC6C26] px-5 py-3 rounded-xl text-sm font-semibold"
            >
              <Plus size={16} className="inline mr-2" />
              Add Your First Habit
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {habits.map((habit) => {
              const timer = getDuration(habit.startedAt);

              return (
                <div
                  key={habit._id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-[#FC6C26]/40 transition duration-300"
                >
                  {/* CARD HEADER */}
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-[#FC6C26]/10 text-[#FC6C26]">
                      <Flame size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">{habit.title}</h3>

                      <p className="text-xs text-gray-500">
                        Stay strong. Keep going.
                      </p>
                    </div>
                  </div>

                  {/* TIMER */}
                  <div className="mt-10 mb-8">
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {[
                        { value: timer.days, label: "DAYS" },
                        { value: timer.hours, label: "HOURS" },
                        { value: timer.minutes, label: "MIN" },
                        { value: timer.seconds, label: "SEC" },
                      ].map((item, index) => (
                        <div key={index}>
                          <div className="bg-white/[0.05] border border-white/[0.05] rounded-xl py-4">
                            <h2 className="text-2xl font-bold tabular-nums text-[#FC6C26]">
                              {String(item.value).padStart(2, "0")}
                            </h2>
                          </div>

                          <p className="text-[10px] tracking-widest text-gray-500 mt-2">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                    <p className="text-xs text-gray-500">Started on</p>

                    <p className="text-xs text-gray-300">
                      {new Date(habit.startedAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ADD HABIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-3xl p-7">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Start a new journey</h2>

                <p className="text-sm text-gray-400 mt-1">
                  What do you want to leave behind?
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleCreateHabit} className="mt-7">
              <label className="text-sm text-gray-300">Habit name</label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Unnecessary scrolling"
                autoFocus
                maxLength={80}
                className="w-full mt-3 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-[#FC6C26] transition text-white placeholder:text-gray-600"
              />

              <button
                type="submit"
                disabled={!title.trim() || loading}
                className="w-full mt-6 bg-[#FC6C26] hover:bg-[#ff8547] disabled:opacity-50 rounded-xl py-4 font-semibold flex justify-center items-center gap-2 transition"
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
    </div>
  );
};

export default ForMePage;
