import { create } from "zustand";
import { createSelectorFunctions } from "auto-zustand-selectors-hook";
import dayjs, { Dayjs } from "dayjs";
import { createZustandStoreFactory } from "@/shared/lib/zustand";

type CalendarStore = {
  date: Dayjs | null;
  setDate: (date: Dayjs) => void;

  page: {
    year: number;
    month: number;
  };
  setPage: (year: number, month: number) => void;
};

const createCalendarStore = (initialState: Partial<CalendarStore> = {}) => {
  const useBaseStore = create<CalendarStore>((set) => ({
    date: null,
    setDate(to) {
      set({
        date: to,
      });
    },

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
    ...initialState,
  }));

  return createSelectorFunctions(useBaseStore);
};

export default createCalendarStore;
