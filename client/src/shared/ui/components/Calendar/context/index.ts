import { createContext, useContext } from "react";
import createCalendarStore from "../store/index.ts";

const CalendarStoreContext = createContext<ReturnType<typeof createCalendarStore>>(null!);

const useCalendarStore = () => {
  return useContext(CalendarStoreContext);
};

export { CalendarStoreContext, useCalendarStore };
