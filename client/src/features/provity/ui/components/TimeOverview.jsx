import { useEffect } from "react";
import { useDashboardTimeHook } from "../../hooks/DashboardTimeHook";

const TimeOverview = () => {
  const { setNow, countdowns, timeData } = useDashboardTimeHook();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
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
        {countdowns?.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item?.title}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111214] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#FC6C26]/30 hover:bg-[#151414]"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#FC6C26]/[0.04] blur-2xl transition group-hover:bg-[#FC6C26]/10" />

              <div className="relative flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-medium tracking-[1.8px] text-white/40">
                    {item?.title}
                  </p>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-semibold tracking-normal">
                      {String(item?.value).padStart(2, "0")}
                    </span>

                    <span className="text-xs text-white/40">{item?.unit}</span>
                  </div>

                  <p className="mt-2 text-xs text-[#FC6C26]">
                    {item?.remainingDetail}
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#FC6C26]/15 bg-[#FC6C26]/[0.08]">
                  <Icon className="text-xl text-[#FC6C26]" />
                </div>
              </div>

              {/* Elapsed / Remaining */}
              <div className="relative mt-5 flex items-center justify-between gap-2">
                <p className="text-[10px] text-white/40">{item?.detail}</p>

                <p className="shrink-0 text-xs font-medium text-white/70">
                  {item?.progress.toFixed(1)}%
                </p>
              </div>

              {/* Real elapsed progress */}
              <div
                className="relative mt-2 h-2 overflow-hidden rounded-full bg-white/[0.07]"
                role="progressbar"
                aria-label={`${item?.title} elapsed`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Number(item?.progress.toFixed(1))}
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
                <p className="text-[10px] text-white/35">Time remaining</p>

                <p className="text-[10px] text-white/50">
                  {item?.remainingProgress?.toFixed(1)}%
                </p>
              </div>

              <div className="relative mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                <div
                  className="h-full rounded-full bg-emerald-400/70 transition-[width] duration-700"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(0, item?.remainingProgress),
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
                <p className="text-[10px] text-white/35">Total duration</p>

                <p className="text-xs font-medium text-white/65">
                  {item.total} {item.title === "DAY END" ? "hours" : "days"}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default TimeOverview;
