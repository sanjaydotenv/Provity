import ProvityLogo from "./ProvityLogo";
import { IoArrowBackOutline } from "react-icons/io5";
import { FiCornerUpRight } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiAlignLeft } from "react-icons/fi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

import { useNavigateHook } from "../../hooks/NavigationHook";
import { useDashboardHook } from "../../hooks/DashboardHook";

const TodayFlow = () => {
  const { navigate } = useNavigateHook();

  const {
    taskValue,
    showDescriptionInput,
    hideDescriptionInput,
    descriptionToggleInput,
    msg,
    handleTasksData,
    handleTaskSubmit,
  } = useDashboardHook();

  return (
    <div className="min-h-screen  bg-[#080808] px-4 py-5 text-white sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-[1500px] flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between">
          <ProvityLogo />

          <button
            type="button"
            onClick={() => navigate("/dashboard/flow")}
            aria-label="Back to dashboard"
            className="flex h-10 w-12 items-center justify-center border border-white/20 text-xl text-white/80 transition hover:border-[#FC6C26] hover:text-[#FC6C26] sm:h-11 sm:w-14"
          >
            <IoArrowBackOutline />
          </button>
        </header>

        {/* Task Writing Area */}
        <main className="relative mt-8 flex-1 pb-24 sm:mt-12 sm:pb-28">
          <div className="relative min-h-[calc(100vh-190px)] rounded-[24px] bg-[#171515] px-4 py-5 sm:min-h-[460px] sm:rounded-[32px] sm:px-8 sm:py-7 lg:min-h-[465px] lg:px-9 lg:py-6">
            {/* Heading */}
            <label
              htmlFor="task-title-first"
              className="mb-6 block text-sm font-semibold italic text-white/50 sm:text-base"
            >
              Write your task here.
            </label>
            {/* Task Input */}
            <div className="flex items-start gap-3 sm:gap-5">
              <FiCornerUpRight
                size={28}
                strokeWidth={1.2}
                className="mt-1 shrink-0 sm:h-9 sm:w-9"
              />

              <div id="inp-area" className="min-w-0 flex-1">
                <input
                  value={taskValue?.title}
                  name="title"
                  id="task-title-first"
                  onChange={handleTasksData}
                  placeholder="Write your task here..."
                  className="w-full bg-transparent text-xl font-semibold italic tracking-wide text-white outline-none transition-all duration-300 placeholder:font-semibold placeholder:italic placeholder:text-white/35 focus:placeholder:text-white/20 sm:text-2xl lg:text-3xl"
                  type="text"
                />
              </div>
            </div>
            {/* Description Area */}
            {descriptionToggleInput ? (
              <div
                id="description-inp"
                className="ml-9 mt-4 w-full max-w-2xl sm:ml-14"
              >
                <label
                  htmlFor="task-description"
                  className="mb-3 flex items-center gap-2 text-sm font-medium tracking-wide text-[var(--text-color)]/70"
                >
                  <IoDocumentTextOutline
                    className="text-[var(--primary-color)]"
                    size={18}
                  />
                  Task Description
                  <span className="text-xs text-[var(--text-color)]/30">
                    (Optional)
                  </span>
                </label>

                <div className="group relative">
                  {/* Left Icon */}
                  <FiAlignLeft
                    size={20}
                    className="absolute left-4 top-4 text-[var(--primary-color)]/70 transition-colors duration-300 group-focus-within:text-[var(--primary-color)]"
                  />

                  {/* Textarea */}
                  <textarea
                    value={taskValue?.description}
                    name="description"
                    onChange={handleTasksData}
                    id="task-description"
                    placeholder="Add more details about your task..."
                    rows={4}
                    className="w-full resize-y rounded-xl border border-[var(--border-color)]/30 bg-[var(--main-bg-2)]/40 py-4 pl-12 pr-4 text-sm leading-6 text-[var(--text-color)] outline-none transition-all duration-300 placeholder:text-[var(--text-color)]/30 hover:border-[var(--primary-color)]/50 focus:border-[var(--primary-color)] focus:bg-[var(--main-bg-2)]/70 focus:shadow-[0_0_15px_var(--primary-color)]/10 sm:text-base"
                  />
                </div>

                {/* Helper Text */}
                <p className="mt-2 flex items-center gap-1.5 text-xs text-[var(--text-color)]/35">
                  <IoDocumentTextOutline size={13} />
                  Add details to help you remember what needs to be done.
                </p>
              </div>
            ) : (
              <div
                id="description-area"
                className={`relative  ml-9 mt-3 w-[min(280px,calc(100%-2.25rem))] rounded-md bg-[#514B4B] p-2 shadow-lg sm:ml-14 sm:mt-4 sm:w-[280px] lg:ml-16  ${msg ? "" : "hidden"}`}
              >
                {/* Popup Arrow */}
                <div className="absolute -top-2 left-6 h-4 w-4 rotate-45 bg-[#514B4B]" />
                {/* Description Message */}
                <p className="relative break-words text-[11px] leading-[1.4] text-white/90 sm:text-xs">
                  Do you want to write a description for your task? If yes,
                  click the plus sign; otherwise, click the cross sign.
                </p>
                {/* Buttons */}
                <div className="relative mt-2 flex items-center gap-1.5">
                  {/* Yes Button */}
                  <button
                    type="button"
                    onClick={showDescriptionInput}
                    aria-label="Add description"
                    className="group flex h-[19px] w-5 items-center justify-center rounded-[3px] border border-[var(--border-color)] bg-[var(--text-color)] text-[var(--main-bg)] transition-all duration-200 hover:bg-[var(--main-bg)] hover:text-[var(--text-color)]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="h-full w-full"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  </button>

                  {/* No Button */}
                  <button
                    type="button"
                    onClick={hideDescriptionInput}
                    aria-label="Dismiss description prompt"
                    className="group flex h-[19px] w-5 items-center justify-center rounded-[3px] border border-[var(--border-color)] bg-[var(--text-color)] text-[var(--main-bg)] transition-all duration-200 hover:bg-[var(--main-bg)] hover:text-[var(--text-color)]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="h-full w-full"
                    >
                      <path d="m6 6 12 12M18 6 6 18" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={handleTaskSubmit}
              type="button"
              className="group flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-[var(--primary-color)] px-5 py-3 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(252,108,38,0.2)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(252,108,38,0.4)] active:translate-y-0 active:scale-95 absolute bottom-10 right-10"
            >
              {/* Shimmer Effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {/* Icon */}
              <IoCheckmarkDoneOutline
                size={20}
                className="relative transition-transform duration-300 group-hover:scale-110"
              />

              {/* Text */}
              <span className="relative">Save Task</span>
            </button>
          </div>

          {/* Task Actions */}
          <div className="ml-9 mt-5 flex flex-wrap items-center gap-3 sm:ml-14">
            {/* Done Button */}
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-[var(--primary-color)]/40 bg-[var(--primary-color)]/10 px-4 py-2 text-sm font-medium text-[var(--primary-color)] transition-all duration-200 hover:bg-[var(--primary-color)] hover:text-white"
            >
              <IoCheckmarkCircleOutline size={18} />
              Mark as Done
            </button>

            {/* Status */}
            <span className="flex items-center gap-2 text-xs text-white/40">
              <span className="h-2 w-2 rounded-full bg-[var(--primary-color)]" />
              In Progress
            </span>
          </div>

          {/* Floating Add Button */}
        </main>
      </div>
    </div>
  );
};

export default TodayFlow;
