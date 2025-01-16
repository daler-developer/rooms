import { createContext, useContext } from "react";

const DateContext = createContext(null);

const useDateContext = () => {
  return useContext(DateContext);
};

export { DateContext, useDateContext };
