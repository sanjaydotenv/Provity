import React from "react";
import {
  X,
  Sparkles,
  Bot,
  Search,
  Brain,
  Flame,
  ArrowDown,
  MessageCircle,
  Globe2
} from "lucide-react";

const ForMe = ({ setShowMsg }) => {
  const translations = [
    { lang: "English", text: "DO FUCKING WORK", code: "EN" },
    { lang: "Hindi", text: "काम पर लग जा", code: "HI" },
    { lang: "Marathi", text: "कामाला लाग", code: "MR" },
    { lang: "Bengali", text: "কাজে লেগে পড়", code: "BN" },
    { lang: "Tamil", text: "வேலையைச் செய்", code: "TA" },
    { lang: "Telugu", text: "పని చేయి", code: "TE" },
    { lang: "Kannada", text: "ಕೆಲಸ ಮಾಡು", code: "KN" },
    { lang: "Malayalam", text: "ജോലി ചെയ്യൂ", code: "ML" },
    { lang: "Gujarati", text: "કામ કર", code: "GU" },
    { lang: "Punjabi", text: "ਕੰਮ ਕਰ", code: "PA" },
    { lang: "Urdu", text: "کام کرو", code: "UR" },
    { lang: "Nepali", text: "काम गर", code: "NE" },
    { lang: "Sanskrit", text: "कर्म कुरु", code: "SA" },
    { lang: "Russian", text: "Работай!", code: "RU" },
    { lang: "Spanish", text: "¡Ponte a trabajar!", code: "ES" },
    { lang: "French", text: "Au travail !", code: "FR" },
    { lang: "German", text: "Mach deine Arbeit!", code: "DE" },
    { lang: "Italian", text: "Mettiti al lavoro!", code: "IT" },
    { lang: "Portuguese", text: "Vai trabalhar!", code: "PT" },
    { lang: "Dutch", text: "Aan het werk!", code: "NL" },
    { lang: "Japanese", text: "さっさと働け！", code: "JA" },
    { lang: "Chinese", text: "赶紧干活！", code: "ZH" },
    { lang: "Korean", text: "당장 일해!", code: "KO" },
    { lang: "Arabic", text: "ابدأ العمل!", code: "AR" },
    { lang: "Turkish", text: "Hadi çalış!", code: "TR" },
    { lang: "Persian", text: "برو سر کارت!", code: "FA" },
    { lang: "Thai", text: "ไปทำงานได้แล้ว!", code: "TH" },
    { lang: "Vietnamese", text: "Làm việc đi!", code: "VI" },
    { lang: "Indonesian", text: "Ayo bekerja!", code: "ID" },
    { lang: "Malay", text: "Pergi bekerja!", code: "MS" },
    { lang: "Filipino", text: "Magtrabaho ka!", code: "TL" },
    { lang: "Swahili", text: "Fanya kazi!", code: "SW" },
    { lang: "Afrikaans", text: "Gaan werk!", code: "AF" },
    { lang: "Greek", text: "Πιάσε δουλειά!", code: "EL" },
    { lang: "Polish", text: "Bierz się do roboty!", code: "PL" },
    { lang: "Czech", text: "Pusť se do práce!", code: "CS" },
    { lang: "Slovak", text: "Pusti sa do práce!", code: "SK" },
    { lang: "Hungarian", text: "Munkára fel!", code: "HU" },
    { lang: "Romanian", text: "Treci la treabă!", code: "RO" },
    { lang: "Bulgarian", text: "Хващай се за работа!", code: "BG" },
    { lang: "Serbian", text: "Na posao!", code: "SR" },
    { lang: "Croatian", text: "Baci se na posao!", code: "HR" },
    { lang: "Swedish", text: "Börja jobba!", code: "SV" },
    { lang: "Norwegian", text: "Kom deg på jobb!", code: "NO" },
    { lang: "Danish", text: "Kom i gang med arbejdet!", code: "DA" },
    { lang: "Finnish", text: "Ryhdypä töihin!", code: "FI" },
    { lang: "Ukrainian", text: "Берися до роботи!", code: "UK" },
    { lang: "Hebrew", text: "יאללה לעבודה!", code: "HE" },
    { lang: "Irish", text: "Téigh ag obair!", code: "GA" },
    { lang: "Albanian", text: "Fillo punën!", code: "SQ" },
    { lang: "Estonian", text: "Asu tööle!", code: "ET" },
    { lang: "Latvian", text: "Sāc strādāt!", code: "LV" },
    { lang: "Lithuanian", text: "Imkis darbo!", code: "LT" },
    { lang: "Icelandic", text: "Farðu að vinna!", code: "IS" },
    { lang: "Mongolian", text: "Ажилдаа ор!", code: "MN" },
    { lang: "Burmese", text: "အလုပ်လုပ်ပါ!", code: "MY" },
    { lang: "Khmer", text: "ទៅធ្វើការ!", code: "KM" },
    { lang: "Lao", text: "ໄປເຮັດວຽກ!", code: "LO" },
  ];

  return (
    <div className="relative h-full w-full overflow-x-hidden overflow-y-auto overscroll-contain bg-[var(--main-bg)] text-[var(--text-color)]">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[var(--primary-color)] opacity-[0.07] blur-[130px]" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[var(--primary-color2)] opacity-[0.08] blur-[130px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--main-bg)]/90 px-5 py-4 backdrop-blur-xl sm:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--primary-color)]/30 bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
            <Brain size={21} />
          </div>

          <div>
            <h1 className="text-sm font-bold tracking-widest">
              SELF{" "}
              <span className="text-[var(--primary-color)]">REFLECTION.</span>
            </h1>
            <p className="text-[10px] tracking-wider text-white/40">
              A MOMENT OF TRUTH
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowMsg(false)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-color)] text-white/60 transition hover:border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
        >
          <X size={20} />
        </button>
      </header>

      <main className="relative mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-20">
        {/* INTRO */}
        <section className="mb-20 text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--primary-color)]/30 bg-[var(--primary-color)]/10 px-4 py-2 text-xs font-semibold tracking-widest text-[var(--primary-color)]">
            <Sparkles size={14} />
            SOMETHING TO THINK ABOUT
          </div>

          <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            WHO IS YOUR
            <span className="block text-[var(--primary-color)]">
              BIGGEST ENEMY?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
            I asked two of the most powerful information sources a simple
            question. Their answers might make you think differently about
            yourself.
          </p>

          <div className="mt-10 flex justify-center">
            <div className="flex h-12 w-12 animate-bounce items-center justify-center rounded-full border border-[var(--primary-color)]/30 text-[var(--primary-color)]">
              <ArrowDown size={20} />
            </div>
          </div>
        </section>

        {/* AI SECTION */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
              <Bot size={23} />
            </div>

            <div>
              <p className="text-xs font-bold tracking-[3px] text-[var(--primary-color)]">
                FIRST RESPONSE
              </p>
              <h3 className="text-xl font-bold">I asked ChatGPT</h3>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[var(--primary-color)]/20 bg-[var(--main-bg-2)] shadow-[0_15px_60px_rgba(0,0,0,0.25)]">
            {/* AI Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">
              <div className="flex items-center gap-2">
                <Sparkles size={17} className="text-[var(--primary-color)]" />
                <span className="text-sm font-semibold">AI Assistant</span>
              </div>

              <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-[10px] font-semibold text-green-400">
                RESPONSE RECEIVED
              </span>
            </div>

            <div className="space-y-7 p-5 sm:p-8">
              {/* User Question */}
              <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-sm border border-white/10 bg-white/[0.06] p-4 sm:max-w-[75%]">
                <p className="mb-2 text-[10px] font-bold tracking-widest text-white/40">
                  MY QUESTION
                </p>
                <p className="text-sm leading-7">
                  AI, tell me Who is the biggest enemy of humans?
                </p>
              </div>

              {/* AI Answer */}
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-color)]/15 text-[var(--primary-color)]">
                  <Bot size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="mb-4 text-xs font-semibold text-[var(--primary-color)]">
                    AI'S ANSWER
                  </p>

                  <h4 className="mb-4 text-lg font-bold leading-8 sm:text-2xl">
                    The biggest enemy of humans is their own mind when they
                    don't know how to control it.
                  </h4>

                  <p className="mb-5 text-sm leading-7 text-white/60">
                    Let me explain why:
                  </p>

                  <div className="space-y-4">
                    {[
                      [
                        "01",
                        "Overthinking",
                        "We create problems in our minds that haven't even happened.",
                      ],
                      [
                        "02",
                        "Fear",
                        "We stop ourselves from taking opportunities because we're afraid of failure.",
                      ],
                      [
                        "03",
                        "Laziness",
                        "We know what we need to do, but keep postponing it.",
                      ],
                      [
                        "04",
                        "Ego",
                        "We refuse to accept our mistakes, even when we know we're wrong.",
                      ],
                      [
                        "05",
                        "Distractions",
                        "We waste our most valuable resource, time, on things that don't help us grow.",
                      ],
                      [
                        "06",
                        "Comparison",
                        "We compare our journey with someone else's success and lose confidence.",
                      ],
                    ].map(([number, title, description]) => (
                      <div
                        key={number}
                        className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4 transition hover:border-[var(--primary-color)]/30"
                      >
                        <span className="text-sm font-bold text-[var(--primary-color)]">
                          {number}
                        </span>

                        <div>
                          <h5 className="mb-1 text-sm font-bold">{title}</h5>
                          <p className="text-xs leading-6 text-white/50 sm:text-sm">
                            {description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Remember */}
                  <div className="mt-7 rounded-2xl border border-[var(--primary-color)]/30 bg-[var(--primary-color)]/[0.07] p-5 sm:p-6">
                    <div className="mb-3 flex items-center gap-2 text-[var(--primary-color)]">
                      <Flame size={18} />
                      <span className="text-xs font-bold tracking-widest">
                        REMEMBER THIS
                      </span>
                    </div>

                    <p className="text-base font-semibold italic leading-8 sm:text-lg">
                      "Your mind can be your greatest weapon or your greatest
                      enemy. The difference is how you use it."
                    </p>
                  </div>

                  <p className="mt-7 text-sm font-semibold leading-7 text-white/80">
                    You don't need to defeat the whole world to become
                    successful. Sometimes, you just need to defeat the version
                    of yourself that keeps making excuses.
                    <span className="ml-2 text-[var(--primary-color)]">🔥</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <div className="mb-16 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs font-bold tracking-[3px] text-white/30">
            BUT WAIT...
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* GOOGLE SECTION */}
        <section className="mb-20">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-400">
              <Search size={22} />
            </div>

            <div>
              <p className="text-xs font-bold tracking-[3px] text-blue-400">
                SECOND RESPONSE
              </p>
              <h3 className="text-xl font-bold">Then I asked Google</h3>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[var(--main-bg-2)] p-5 shadow-xl sm:p-8">
            {/* Search Bar */}
            <div className="mb-8 flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-5 py-3">
              <Search size={17} className="text-white/40" />

              <span className="flex-1 text-sm text-white/70">
                Who is the biggest enemy of humans?
              </span>

              <span className="text-xs font-semibold text-blue-400">
                Search
              </span>
            </div>

            <div className="mb-5 flex items-center gap-2">
              <Search size={17} className="text-blue-400" />
              <span className="text-xs font-bold tracking-widest text-blue-400">
                GOOGLE'S RESPONSE
              </span>
            </div>

            <h4 className="mb-5 text-xl font-bold leading-8 sm:text-2xl">
              Your biggest enemy is often{" "}
              <span className="text-[var(--primary-color)]">yourself.</span>
            </h4>

            <p className="text-sm leading-8 text-white/60 sm:text-base">
              Your uncontrolled thoughts, fears, ego and bad habits can become
              bigger obstacles than any external enemy. The person who can
              control their mind and actions has the power to change their life.
            </p>
          </div>
        </section>

        {/* FINAL THOUGHT */}
        <section className="relative overflow-hidden rounded-3xl border border-[var(--primary-color)]/30 bg-gradient-to-br from-[var(--primary-color)]/15 via-[var(--main-bg-2)] to-[var(--main-bg)] p-7 text-center sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--primary-color)]/10 blur-[90px]" />

          <MessageCircle
            size={30}
            className="mx-auto mb-5 text-[var(--primary-color)]"
          />

          <p className="mb-4 text-xs font-bold tracking-[4px] text-[var(--primary-color)]">
            ONE LAST THOUGHT
          </p>

          <h3 className="mx-auto max-w-2xl text-2xl font-black leading-relaxed sm:text-4xl">
            Stop fighting the world.
            <span className="block text-[var(--primary-color)]">
              Start winning against yourself.
            </span>
          </h3>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/50">
            Every day gives you a choice. Feed your excuses or build your
            discipline. Your future depends on what you choose today.
          </p>

          <button
            onClick={() => setShowMsg(false)}
            className="mt-9 rounded-xl bg-[var(--primary-color)] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-900/20 transition hover:scale-105 hover:bg-[var(--primary-color2)] active:scale-95"
          >
            I GOT THE MESSAGE. →
          </button>
        </section>
        <section className="relative mx-auto flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#090909] px-4 py-10 sm:px-8">
          {/* Background Glow */}
          <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#FC6C26]/10 blur-[150px]" />

          <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-600/10 blur-[150px]" />

          {/* Main Glass Container */}
          <div className="relative flex h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-[32px] border border-white/[0.12] bg-white/[0.035] shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            {/* Top Glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FC6C26] to-transparent shadow-[0_0_20px_#FC6C26]" />

            {/* Header */}
            <div className="relative shrink-0 border-b border-white/[0.08] px-5 py-6 sm:px-10 sm:py-8">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#FC6C26]/30 bg-[#FC6C26]/10 text-[#FC6C26] shadow-[0_0_30px_rgba(252,108,38,0.15)]">
                    <Flame size={28} />
                  </div>

                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <Sparkles size={13} className="text-[#FC6C26]" />

                      <span className="text-[10px] font-bold tracking-[3px] text-[#FC6C26]">
                        YOUR DAILY REMINDER
                      </span>
                    </div>

                    <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                      DO FUCKING WORK
                      <span className="text-[#FC6C26]">.</span>
                    </h2>
                  </div>
                </div>

                {/* Language Count */}
                <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3">
                  <Globe2 size={20} className="text-[#FC6C26]" />

                  <div>
                    <p className="text-xl font-black leading-none text-white">
                      {translations.length}+
                    </p>

                    <p className="mt-1 text-[9px] font-bold tracking-[2px] text-white/40">
                      LANGUAGES
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-xs leading-6 text-white/40 sm:text-sm">
                Different languages. Different cultures. One universal message.
                Stop making excuses and get the work done.
              </p>
            </div>

            {/* Tags Container */}
            <div className="relative flex-1 overflow-y-auto overscroll-contain p-5 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white/80">
                    One Message. Many Languages.
                  </h3>

                  <p className="mt-1 text-[10px] tracking-wide text-white/30">
                    FIND YOUR MOTIVATION
                  </p>
                </div>

                <span className="rounded-full border border-[#FC6C26]/20 bg-[#FC6C26]/10 px-3 py-1.5 text-[9px] font-bold tracking-wider text-[#FC6C26]">
                  NO EXCUSES
                </span>
              </div>

              {/* Language Tags */}
              <div className="flex flex-wrap gap-3">
                {translations.map((item, index) => (
                  <div
                    key={item.code}
                    className="group relative flex min-h-[76px] flex-col justify-center overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.035] px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#FC6C26]/50 hover:bg-[#FC6C26]/[0.08] hover:shadow-[0_8px_30px_rgba(252,108,38,0.12)]"
                    style={{
                      animationDelay: `${index * 20}ms`,
                    }}
                  >
                    {/* Hover Glow */}
                    <div className="pointer-events-none absolute -right-8 -top-8 h-16 w-16 rounded-full bg-[#FC6C26]/0 blur-2xl transition-all duration-500 group-hover:bg-[#FC6C26]/30" />

                    {/* Language Label */}
                    <div className="relative mb-2 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FC6C26] opacity-60 transition-all group-hover:opacity-100 group-hover:shadow-[0_0_8px_#FC6C26]" />

                      <span className="text-[9px] font-bold uppercase tracking-[2px] text-white/35 transition-colors group-hover:text-[#FC6C26]">
                        {item.lang}
                      </span>
                    </div>

                    {/* Translation */}
                    <p
                      dir="auto"
                      className="relative text-sm font-bold tracking-wide text-white/80 transition-all duration-300 group-hover:text-white sm:text-base"
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Message */}
              <div className="mt-10 rounded-2xl border border-[#FC6C26]/20 bg-gradient-to-r from-[#FC6C26]/10 via-white/[0.025] to-transparent p-5 sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FC6C26]/15 text-[#FC6C26]">
                    <Flame size={22} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white sm:text-xl">
                      Enough Talking. Start Working.
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-white/40 sm:text-sm">
                      You don't need another motivational video. You don't need
                      another perfect plan. You just need to get up and do the
                      work.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex shrink-0 items-center justify-between border-t border-white/[0.08] px-5 py-4 sm:px-10">
              <p className="text-[9px] font-bold tracking-[2px] text-white/25 sm:text-[10px]">
                PROVITY · DISCIPLINE OVER EXCUSES
              </p>

              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FC6C26]" />

                <span className="text-[9px] font-bold tracking-widest text-[#FC6C26]">
                  STAY FOCUSED
                </span>
              </div>
            </div>
          </div>
        </section>

        <footer className="pb-8 pt-12 text-center">
          <p className="text-[10px] font-semibold tracking-[3px] text-white/25">
            PROVITY · BECOME BETTER THAN YESTERDAY
          </p>
        </footer>
      </main>
    </div>
  );
};

export default ForMe;
