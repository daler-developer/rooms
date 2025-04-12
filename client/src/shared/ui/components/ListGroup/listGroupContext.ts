import { createContext, useContext } from "react";

type ContextValue = {
  totalItems: number;
};

export const ListGroupContext = createContext<ContextValue>(null!);

export const useListGroupContext = () => useContext(ListGroupContext);
