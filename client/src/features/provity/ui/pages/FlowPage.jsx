import {
  IoAddOutline,
  IoArrowBackOutline,
  IoCalendarOutline,
} from "react-icons/io5";
import { LuClipboardList, LuArrowDownRight } from "react-icons/lu";
import ProvityLogo from "../components/ProvityLogo";
import { useNavigateHook } from "../../hooks/NavigationHook";
import { useDashboardHook } from "../../hooks/DashboardHook";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TaskCardUI from "../components/TaskCardUI";
import Loading from "../components/Loading";

const FlowPage = () => {
  const { navigate } = useNavigateHook();
  const { handleAllTasksData } = useDashboardHook();
  const { accessToken } = useSelector((state) => state.auth);
  const { allFlows } = useSelector((state) => state.flow);

  useEffect(() => {
    if (accessToken) {
      handleAllTasksData(accessToken);
    }
  }, [accessToken, allFlows]);
  
  if (!allFlows) {
    return <Loading />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--main-bg)] px-4 py-4 sm:px-7 sm:py-5">
      {/* Existing Logo */}

      <div>
        <div className="flex items-center justify-between py-2 px-1">
          <ProvityLogo />

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            aria-label="Back to dashboard"
            className="flex h-10 w-12 items-center justify-center border border-white/20 text-xl text-white/80 transition hover:border-[#FC6C26] hover:text-[#FC6C26] sm:h-11 sm:w-14"
          >
            <IoArrowBackOutline />
          </button>
        </div>

        {/* Main Content */}
        <main className="mx-auto min-h-[calc(100svh-100px)] w-full max-w-7xl pb-24 pt-8 sm:pt-10">
          {/* Page Header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-[var(--primary-color)]">
                Your productivity
              </p>

              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                My Tasks<span className="text-[var(--primary-color)]">.</span>
              </h1>

              <p className="mt-2 text-sm text-white/40">
                Keep your day organized, one task at a time.
              </p>
            </div>

            {/* Task Count */}
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                <LuClipboardList size={20} />
              </div>

              <div>
                <p className="text-lg font-semibold leading-5 text-white">
                  {Array.isArray(allFlows) ? allFlows.length : 0}
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40">
                  Total tasks
                </p>
              </div>
            </div>
          </div>

          {/* Tasks */}
          {!Array.isArray(allFlows) || allFlows.length === 0 ? (
            <section className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-5 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--primary-color)]/20 bg-[var(--primary-color)]/[0.08] text-[var(--primary-color)]">
                <LuClipboardList size={32} strokeWidth={1.4} />
              </div>

              <h2 className="text-xl font-semibold text-white">
                Nothing on your plate yet.
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-white/40">
                You haven't added any tasks yet. Create your first task and
                start organizing your day.
              </p>

              <button
                type="button"
                onClick={() => navigate("/dashboard/add-flow")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--primary-color)] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-110 active:scale-95"
              >
                <IoAddOutline size={20} />
                Create your first task
              </button>
            </section>
          ) : (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-medium text-white/70">
                  All your tasks
                </h2>

                <span className="text-xs text-white/35">
                  {allFlows.length} {allFlows.length === 1 ? "task" : "tasks"}
                </span>
              </div>

              <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-3 sm:gap-4">
                {allFlows.map((task, index) => (
                  <TaskCardUI
                    key={task._id || index}
                    task={task}
                    index={index}
                  />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Existing Animated Add Task Button */}
        <button
          onClick={() => navigate("/dashboard/add-flow")}
          type="button"
          aria-label="Add new task"
          className="
          group fixed bottom-5 right-5 z-20
          flex h-14 w-14 items-center justify-center
          rounded-full bg-[var(--primary-color)] text-black
          shadow-[0_0_20px_rgba(252,108,38,0.35)]
          transition-all duration-300 ease-out
          hover:scale-110
          hover:shadow-[0_0_35px_rgba(252,108,38,0.75)]
          active:scale-90
          animate-[taskPulse_2.2s_ease-in-out_infinite]
          sm:bottom-8 sm:right-8 sm:h-[68px] sm:w-[68px]
          lg:bottom-10 lg:right-10 lg:h-[74px] lg:w-[74px]
        "
        >
          {/* Outer Glow */}
          <span
            className="
            absolute inset-0 -z-10 rounded-full
            bg-[var(--primary-color)] opacity-40 blur-xl
            transition-all duration-500
            group-hover:opacity-90 group-hover:blur-2xl
          "
          />

          {/* Animated Ring */}
          <span
            className="
            pointer-events-none absolute inset-[-5px]
            rounded-full border border-[var(--primary-color)]/50
            animate-[ringPulse_2.2s_ease-out_infinite]
          "
          />

          {/* Plus Icon */}
          <IoAddOutline
            size={42}
            strokeWidth={1.5}
            className="relative z-10 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110"
          />

          {/* Tooltip */}
          <span
            className="
            pointer-events-none absolute right-full mr-4
            whitespace-nowrap rounded-lg border border-white/10
            bg-[#171717] px-4 py-2 text-sm font-medium text-white
            opacity-0 shadow-xl transition-all duration-300
            translate-x-2 group-hover:translate-x-0
            group-hover:opacity-100
          "
          >
            + Create a new task
          </span>
        </button>

        {/* Animations */}
        <style>{`
        @keyframes taskPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 15px rgba(252, 108, 38, 0.25);
          }
          50% {
            transform: scale(1.07);
            box-shadow: 0 0 32px rgba(252, 108, 38, 0.65);
          }
        }

        @keyframes ringPulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.45);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[taskPulse_2\\.2s_ease-in-out_infinite\\],
          .animate-\\[ringPulse_2\\.2s_ease-out_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
      </div>
    </div>
  );
};

export default FlowPage;
