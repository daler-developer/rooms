import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { useMemo } from "react";
import { useCalendarStore } from "./context";

type Props = {
  date: Dayjs;
  onClick: () => void;
};

const Cell = ({ date, onClick }: Props) => {
  const selectedDate = useCalendarStore().use.date();
  const setSelectedDate = useCalendarStore().use.setDate();

  const page = useCalendarStore().use.page();
  const setPage = useCalendarStore().use.setPage();

  const isSelected = useMemo(() => {
    return Boolean(selectedDate) && selectedDate.isSame(date, "year") && selectedDate.isSame(date, "month") && selectedDate.isSame(date, "day");
  }, [selectedDate, date]);

  const isToday = useMemo(() => {
    const today = dayjs();

    return today.isSame(date, "year") && today.isSame(date, "month") && today.isSame(date, "day");
  }, [date]);

  const isPrevMonth = useMemo(() => {
    return date.month() < page.month;
  }, [date, page.month]);

  const isNextMonth = useMemo(() => {
    return date.month() > page.month;
  }, [date, page.month]);

  const handleClick = () => {
    setSelectedDate(date);
    setPage(date.year(), date.month());
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={clsx("flex items-center justify-center cursor-pointer text-[20px] w-[40px] h-[40px] rounded-sm select-none", {
        "hover:bg-slate-100": !isSelected && !isPrevMonth && !isNextMonth,
        "hover:bg-gray-50": !isSelected && (isPrevMonth || isNextMonth),
        "text-gray-300": isNextMonth || isPrevMonth,
        "bg-blue-100": isSelected && !isNextMonth && !isNextMonth,
        "border border-blue-500": isToday && !isSelected,
      })}
    >
      {date.date()}
    </div>
  );
};

export default Cell;
