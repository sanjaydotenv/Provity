import { IoAddOutline } from "react-icons/io5";

const FlowPage = () => {
  return (
    <div>
      <button
        type="button"
        aria-label="Add new task"
        className="fixed bottom-5 right-5 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_0_35px_rgba(255,255,255,0.08)] transition duration-300 hover:scale-105 hover:bg-[#FC6C26] sm:bottom-8 sm:right-8 sm:h-[68px] sm:w-[68px] lg:bottom-10 lg:right-10 lg:h-[74px] lg:w-[74px]"
      >
        <IoAddOutline size={42} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default FlowPage;
