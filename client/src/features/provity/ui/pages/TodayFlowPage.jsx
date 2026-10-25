import React, { useState } from "react";
import ProvityLogo from "../components/ProvityLogo";

import {
  IoArrowBackOutline,
  IoAddOutline,
  IoCloseOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";

import { FiCornerUpRight, FiFileText } from "react-icons/fi";

const TodayFlowPage = ({ onBack }) => {
  const [tasks, setTasks] = useState([
    {
      id: crypto.randomUUID(),
      title: "Payment integration",
      description: "",
      completed: false,
      showPrompt: true,
    },
  ]);

  const [activeTaskId, setActiveTaskId] = useState(null);

  const addTask = () => {
    const newTask = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      completed: false,
      showPrompt: false,
    };

    setTasks((previous) => [...previous, newTask]);
    setActiveTaskId(newTask.id);
  };

  const updateTask = (id, field, value) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, [field]: value } : task,
      ),
    );
  };

  const removeTask = (id) => {
    setTasks((previous) => previous.filter((task) => task.id !== id));

    if (activeTaskId === id) {
      setActiveTaskId(null);
    }
  };

  const handleDescriptionChoice = (id, choice) => {
    if (choice === "yes") {
      setActiveTaskId(id);
    }

    updateTask(id, "showPrompt", false);
  };

  return (
    <div className="min-h-screen bg-[#080808] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-[1500px] flex-col">
        {/* Header */}
        <header className="flex items-center justify-between">
          <ProvityLogo />

          <button
            onClick={onBack}
            aria-label="Back to dashboard"
            className="flex h-10 w-12 items-center justify-center border border-white/20 text-xl text-white/80 transition hover:border-[#FC6C26] hover:text-[#FC6C26]"
          >
            <IoArrowBackOutline />
          </button>
        </header>

        {/* Task Writing Area */}
        <main className="relative mt-12 flex-1 sm:mt-14">
          <div className="relative min-h-[420px] rounded-[28px] bg-[#171515] px-5 py-5 sm:min-h-[460px] sm:rounded-[32px] sm:px-8 sm:py-7 lg:min-h-[465px] lg:px-9 lg:py-6">
            <label
              htmlFor="task-title-first"
              className="mb-6 block text-sm font-semibold italic text-white/50"
            >
              Write your task here.
            </label>

            <div className="flex flex-col gap-5">
              {tasks.map((task, index) => (
                <div key={task.id} className="relative">
                  {/* Task Row */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <FiCornerUpRight className="mt-1 shrink-0 text-xl text-white/80 sm:text-2xl" />

                    <div className="min-w-0 flex-1">
                      <input
                        id={index === 0 ? "task-title-first" : undefined}
                        type="text"
                        value={task.title}
                        onChange={(event) =>
                          updateTask(task.id, "title", event.target.value)
                        }
                        placeholder="Write your task..."
                        aria-label={`Task ${index + 1} title`}
                        className={`w-full min-w-0 border-0 bg-transparent text-lg font-bold italic outline-none placeholder:text-white/30 sm:text-2xl ${
                          task.completed
                            ? "text-white/40 line-through"
                            : "text-white"
                        }`}
                      />
                    </div>

                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={(event) =>
                        updateTask(task.id, "completed", event.target.checked)
                      }
                      aria-label={`Mark task ${index + 1} completed`}
                      className="mt-1 h-5 w-5 shrink-0 cursor-pointer appearance-none border border-white/50 bg-transparent checked:border-[#FC6C26] checked:bg-[#FC6C26] checked:after:block checked:after:text-center checked:after:text-sm checked:after:font-bold checked:after:text-black checked:after:content-['✓'] sm:h-6 sm:w-6"
                    />

                    <button
                      onClick={() => removeTask(task.id)}
                      aria-label={`Remove task ${index + 1}`}
                      className="mt-1 shrink-0 text-white/30 transition hover:text-red-400"
                    >
                      <IoCloseOutline size={20} />
                    </button>
                  </div>

                  {/* Description Prompt */}
                  {task.showPrompt && (
                    <div className="relative ml-8 mt-3 w-full max-w-[260px] rounded-md bg-[#514B4B] p-2 text-[11px] text-white shadow-xl sm:ml-14">
                      <span className="absolute -top-3 left-5 h-0 w-0 border-b-[13px] border-l-[10px] border-r-[10px] border-b-[#514B4B] border-l-transparent border-r-transparent" />

                      <p>
                        Do you want to write a description for your task? If
                        yes, click the plus sign; otherwise, click the cross
                        sign.
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleDescriptionChoice(task.id, "yes")
                          }
                          aria-label="Add task description"
                          className="flex h-5 w-5 items-center justify-center rounded bg-white text-black transition hover:bg-[#FC6C26]"
                        >
                          <IoCheckmarkOutline size={17} />
                        </button>

                        <button
                          onClick={() => handleDescriptionChoice(task.id, "no")}
                          aria-label="Skip task description"
                          className="flex h-5 w-5 items-center justify-center rounded bg-white text-black transition hover:bg-[#FC6C26]"
                        >
                          <IoCloseOutline size={17} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Optional Description */}
                  {activeTaskId === task.id && (
                    <div className="ml-8 mt-4 sm:ml-14">
                      <div className="flex items-start gap-2">
                        <FiFileText className="mt-2 shrink-0 text-[#FC6C26]" />

                        <textarea
                          autoFocus
                          rows={3}
                          value={task.description}
                          onChange={(event) =>
                            updateTask(
                              task.id,
                              "description",
                              event.target.value,
                            )
                          }
                          placeholder="Write a description for this task..."
                          className="w-full resize-y rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#FC6C26]/60"
                        />
                      </div>

                      <button
                        onClick={() => setActiveTaskId(null)}
                        className="ml-7 mt-2 rounded-lg bg-[#FC6C26] px-3 py-1.5 text-xs font-medium text-black transition hover:bg-[#ff8a52]"
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Floating Add Button */}
          <button
            onClick={addTask}
            aria-label="Add new task"
            className="fixed bottom-7 right-6 z-20 flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-[0_0_35px_rgba(255,255,255,0.08)] transition duration-300 hover:scale-105 hover:bg-[#FC6C26] sm:bottom-10 sm:right-10 sm:h-[74px] sm:w-[74px]"
          >
            <IoAddOutline size={48} strokeWidth={1.5} />
          </button>
        </main>
      </div>
    </div>
  );
};

export default TodayFlowPage;
