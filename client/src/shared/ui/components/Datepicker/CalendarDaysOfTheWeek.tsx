const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarDaysOfTheWeek = () => {
  return (
    <div className="flex mb-3">
      {daysOfTheWeek.map((dayOfTheWeek) => (
        <div key={dayOfTheWeek} className="w-[40px] h-[40px] text-gray-800 font-medium text-center text-xs flex items-center justify-center">
          {dayOfTheWeek}
        </div>
      ))}
    </div>
  );
};

export default CalendarDaysOfTheWeek;
