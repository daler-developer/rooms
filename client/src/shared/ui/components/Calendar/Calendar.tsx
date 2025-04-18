import { useMemo, forwardRef, useImperativeHandle } from "react";
import dayjs, { Dayjs } from "dayjs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Cell from "./Cell";
import { withCalendarStore, useCalendarStore } from "./store.ts";
import { CalendarContext } from "./context";

const monthLabelMap: any = {
  0: "Jan",
  1: "Fab",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const allDaysOfTheWeek = ["Mon", "Tue", "Wed", "Sur", "Fr", "Sat", "Sun"];

export type Props = {
  value: Dayjs | null;
  onChange: (to: Dayjs) => void;
  minDate?: Dayjs;
};

export type CalendarHandle = {
  setValue: (v: Dayjs) => void;
};

const Calendar = forwardRef<CalendarHandle, Props>((props: Props, ref) => {
  const { onChange } = props;
  const { page, setPage } = useCalendarStore();

  const handlePrevMonth = () => {
    const result = dayjs().year(page.year).month(page.month).subtract(1, "month");

    setPage(result.year(), result.month());
  };

  const handleNextMonth = () => {
    const result = dayjs().year(page.year).month(page.month).add(1, "month");

    setPage(result.year(), result.month());
  };

  const cells = useMemo(() => {
    const result: Dayjs[] = [];

    const lastDayOfMonth = dayjs().year(page.year).month(page.month).endOf("month").date();
    const startOfTheMonth = dayjs().year(page.year).month(page.month).startOf("month");

    for (let i = 0; i < lastDayOfMonth; i++) {
      result.push(startOfTheMonth.add(i, "days"));
    }

    while (result[0].day() !== 1) {
      result.unshift(result[0].subtract(1, "days"));
    }

    while (result.at(-1)!.day() !== 0) {
      result.push(result.at(-1)!.add(1, "days"));
    }
    return result;
  }, [page.year, page.month]);

  useImperativeHandle(ref, () => ({
    setValue(value) {
      onChange?.(value);
      setPage(value.year(), value.month());
    },
  }));

  return (
    <CalendarContext.Provider value={props}>
      <div>
        <div className="flex items-center justify-between p-[10px]">
          <div className="font-bold text-[22px]">
            {page.year} {monthLabelMap[page.month]}
          </div>

          <div className="flex items-center gap-x-[5px]">
            <MdKeyboardArrowLeft className="cursor-pointer text-[40px]" onClick={handlePrevMonth} />
            <MdKeyboardArrowRight className="cursor-pointer text-[40px]" onClick={handleNextMonth} />
          </div>
        </div>

        <div
          className="grid gap-[7px]"
          style={{
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: "auto",
            justifyItems: "center",
          }}
        >
          {allDaysOfTheWeek.map((dayOfTheWeek) => (
            <div key={dayOfTheWeek} className="flex items-center justify-center w-[40px] h-[40px] text-[18px] font-medium select-none">
              {dayOfTheWeek}
            </div>
          ))}
          {cells.map((targetDate) => (
            <Cell key={targetDate.toString()} date={targetDate} />
          ))}
        </div>
      </div>
    </CalendarContext.Provider>
  );
});

// const CalendarWrapper = forwardRef<CalendarHandle, Props>((props, ref) => {
//   const calendarStore = useRef<ReturnType<typeof createCalendarStore>>(null);
//
//   if (calendarStore.current === null) {
//     calendarStore.current = createCalendarStore({
//       date: props.value,
//       page: props.value
//         ? {
//             year: props.value.year(),
//             month: props.value.month(),
//           }
//         : {
//             year: dayjs().year(),
//             month: dayjs().month(),
//           },
//     });
//   }
//
//   return (
//     <CalendarStoreContext.Provider value={calendarStore.current!}>
//       <Calendar ref={ref} {...props} />
//     </CalendarStoreContext.Provider>
//   );
// });

export default withCalendarStore(Calendar);
