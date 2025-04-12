import { createContext, useContext } from "react";

type ContextValue = {
  index: number;
};

export const ListGroupItemContext = createContext<ContextValue>(null!);

export const useListGroupItemContext = () => useContext(ListGroupItemContext);
