import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigateHook } from "../../hooks/NavigationHook";

const Loading = () => {
  
  const { navigate } = useNavigateHook();

  const { user } = useSelector((state) => state.auth);


  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-[#080808]">
      {/* Background Glow */}{" "}
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-color)]/10 blur-[100px]" />
      {/* Loading Content */}
      <div className="relative flex flex-col items-center">
        {/* Animated Loader */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[var(--primary-color)] border-r-[var(--primary-color)]/30" />

          <div className="absolute inset-3 animate-[spin_2s_linear_infinite_reverse] rounded-full border-2 border-transparent border-b-[var(--primary-color)]/50 border-l-[var(--primary-color)]" />

          <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl border border-[var(--primary-color)]/30 bg-[var(--primary-color)]/10 text-[var(--primary-color)] shadow-[0_0_30px_rgba(252,108,38,0.15)]">
            <IoCheckmarkDoneOutline size={27} />
          </div>

          <div className="absolute inset-0 animate-spin">
            <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--primary-color)] shadow-[0_0_12px_var(--primary-color)]" />
          </div>
        </div>

        {/* Brand Name */}
        <h2 className="mt-8 text-xl font-semibold tracking-[0.25em] text-white">
          PROVITY<span className="text-[var(--primary-color)]">.</span>
        </h2>

        {/* Loading Text */}
        <div className="mt-3 flex items-center gap-1.5 text-sm text-white/45">
          <span>Preparing your workspace</span>

          <span className="flex gap-1">
            <span className="h-1 w-1 animate-bounce rounded-full bg-[var(--primary-color)] [animation-delay:0ms]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-[var(--primary-color)] [animation-delay:150ms]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-[var(--primary-color)] [animation-delay:300ms]" />
          </span>
        </div>

        {/* Bottom Status */}
        <div className="mt-7 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary-color)]" />

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
            Loading your productivity space
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
