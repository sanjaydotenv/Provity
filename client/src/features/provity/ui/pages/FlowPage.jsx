import {
  IoAddOutline,
  IoArrowBackOutline,
  IoCalendarOutline,
} from "react-icons/io5";
import { LuClipboardList, LuArrowDownRight } from "react-icons/lu";
import ProvityLogo from "../components/ProvityLogo";
import { useNavigateHook } from "../../hooks/NavigationHook";

const FlowPage = () => {
  const { navigate } = useNavigateHook();

  const tasks = [];

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
        <main className="mx-auto flex min-h-[calc(100svh-100px)] w-full max-w-6xl flex-col items-center justify-center pb-16 pt-10">
          {tasks.length === 0 ? (
            <section className="flex w-full max-w-md flex-col items-center text-center">
              {/* Icon */}
              <div className="relative mb-7 flex h-20 w-20 items-center justify-center rounded-3xl border border-[var(--primary-color)]/20 bg-[var(--primary-color)]/[0.07] sm:h-24 sm:w-24">
                <div className="absolute inset-0 rounded-3xl bg-[var(--primary-color)]/10 blur-2xl" />

                <LuClipboardList
                  size={42}
                  strokeWidth={1.2}
                  className="relative text-[var(--primary-color)] sm:h-12 sm:w-12"
                />

                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-[var(--main-bg)] bg-[var(--primary-color)] text-black">
                  <IoAddOutline size={18} />
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Nothing on your plate
                <span className="text-[var(--primary-color)]"> yet.</span>
              </h1>

              {/* Description */}
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/50 sm:text-base">
                You haven't added any tasks for today.
              </p>

              {/* Date / Status */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-white/60 sm:text-sm">
                <IoCalendarOutline
                  size={16}
                  className="text-[var(--primary-color)]"
                />
                <span>Your day starts here</span>
              </div>

              {/* Hint */}
              <div className="mt-8 flex items-center gap-2 text-xs text-white/35">
                <LuArrowDownRight size={16} />
                <span>Tap the + button to create your first task</span>
              </div>
            </section>
          ) : (
            <section className="w-full">
              {/* Today's tasks will appear here */}
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
