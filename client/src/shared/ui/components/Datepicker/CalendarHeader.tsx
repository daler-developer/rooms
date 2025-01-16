import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";

const CalendarHeader = () => {
  return (
    <div className="flex justify-between items-center mb-2">
      <div>
        <span className="text-lg font-bold text-gray-800">February</span>
        <span className="ml-1 text-lg text-gray-600 font-normal">2024</span>
      </div>
      <div>
        <button type="button" className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full">
          <HiChevronLeft className="h-6 w-6 text-gray-500 inline-flex" />
        </button>
        <button type="button" className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full">
          <HiChevronRight className="h-6 w-6 text-gray-500 inline-flex" />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
