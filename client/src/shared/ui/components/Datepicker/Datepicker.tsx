import Input from "../Input/Input.tsx";
import { useState } from "react";
import { HiCalendarDays } from "react-icons/hi2";
import useFloating from "../../hooks/useFloating.ts";
import clsx from "clsx";
import CalendarHeader from "./CalendarHeader.tsx";
import CalendarDaysOfTheWeek from "./CalendarDaysOfTheWeek.tsx";
import { DateContext, useDateContext } from "./DateContext.ts";

type Props = {};

const Datepicker = ({}: Props) => {
  const { showCalendar, setShowCalendar, date } = useDateContext();

  const { floatingStyles, floatingRef, referenceRef } = useFloating({ offset: 5, placement: "bottom-left" });

  const handleInputFocus = () => {
    setShowCalendar(true);
  };

  const calendarClasses = clsx("bg-white rounded-lg shadow p-4", {
    hidden: !showCalendar,
  });

  return (
    <div>
      <div ref={referenceRef}>
        <Input AfterIcon={HiCalendarDays} value={date} placeholder="Select date" onFocus={handleInputFocus} />
      </div>

      <div ref={floatingRef} style={floatingStyles} className={calendarClasses}>
        <CalendarHeader />
        <CalendarDaysOfTheWeek />
      </div>
    </div>
  );
};

const DatepickerWrapper = (props: Props) => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [date, setDate] = useState("");

  const value = {
    date,
    setDate,
    showCalendar,
    setShowCalendar,
  };

  return (
    <DateContext.Provider value={value}>
      <Datepicker {...props} />
    </DateContext.Provider>
  );
};

export default DatepickerWrapper;
