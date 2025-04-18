import { createContext, useContext } from "react";
import { type Props } from "../Calendar.tsx";

type ContextValue = Props;

const CalendarContext = createContext<ContextValue>(null!);

const useCalendarContext = () => {
  return useContext(CalendarContext);
};

export { CalendarContext, useCalendarContext };
