import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { useMemo } from "react";
import { useCalendarStore } from "./store.ts";
import { useCalendarContext } from "./context";

type Props = {
  date: Dayjs;
};

const Cell = ({ date }: Props) => {
  const { page, setPage } = useCalendarStore();
  const { value, onChange, minDate } = useCalendarContext();

  const isSelected = useMemo(() => {
    if (!value) return false;

    return Boolean(value) && value.isSame(date, "year") && value.isSame(date, "month") && value.isSame(date, "day");
  }, [value, date]);

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

  const disabled = useMemo(() => {
    if (minDate && minDate.isAfter(date, "date")) {
      return true;
    }

    return false;
  }, [minDate, value]);

  const handleClick = () => {
    onChange(date);
    setPage(date.year(), date.month());
  };

  return (
    <button
      disabled={disabled}
      type="button"
      onClick={handleClick}
      className={clsx("flex items-center justify-center text-[20px] w-[40px] h-[40px] rounded-sm select-none", {
        "hover:bg-slate-100": !disabled && !isSelected && !isPrevMonth && !isNextMonth,
        "hover:bg-gray-50": !disabled && !isSelected && (isPrevMonth || isNextMonth),
        "text-gray-400": !disabled && (isNextMonth || isPrevMonth),
        "bg-blue-100": isSelected && !isNextMonth && !isNextMonth,
        "text-gray-200": disabled,
        "border border-blue-500": isToday && !isSelected,
        "cursor-pointer": !disabled,
      })}
    >
      {date.date()}
    </button>
  );
};

export default Cell;
