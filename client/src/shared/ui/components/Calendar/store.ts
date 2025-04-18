import { createZustandStoreFactory } from "@/shared/lib/zustand";
import dayjs from "dayjs";

type CalendarStore = {
  page: {
    year: number;
    month: number;
  };
  setPage: (year: number, month: number) => void;
};

const { withStore: withCalendarStore, useStore: useCalendarStore } = createZustandStoreFactory<CalendarStore>((set) => ({
  page: {
    year: dayjs().year(),
    month: dayjs().month(),
  },
  setPage(year, month) {
    set({
      page: {
        year,
        month,
      },
    });
  },
}));

export { withCalendarStore, useCalendarStore };
