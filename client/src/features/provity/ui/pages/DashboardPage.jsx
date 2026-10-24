import React from "react";
import ProvityLogo from "../components/ProvityLogo";
import { IoHome } from "react-icons/io5";
import { GoPlus } from "react-icons/go";

const DashboardPage = () => {
  return (
    <div className="h-screen w-full bg-[var(--main-bg)] flex">
      <aside className="h-screen w-60 border-1 border-r-[var(--border-color)]/40 px-5 py-5 ">
        <div id="nav" className="nav w-full flex justify-between items-center">
          <ProvityLogo />
        </div>

        <div id="tabs" className="text-white mt-15 gap-5 flex flex-col cursor-pointer">
          <div className="bg-[var(--primary-color)]/30 border-l-5 border-[var(--primary-color)] text-xl px-2 flex items-center gap-2 py-2 rounded-lg">
            <IoHome color="var(--primary-color)" />
            <h4>Dashboard</h4>
          </div>
          <div className="text-xl px-2 flex items-center gap-2 py-2 rounded-lg hover:bg-[var(--primary-color)]/30 animation all duration-350">
            <GoPlus />

            <h4>Today Flow</h4>
          </div>
        </div>
      </aside>
      <main className="h-full w-full text-white px-5 py-2 ">
        hello
      </main>
    </div>
  );
};

export default DashboardPage;
