import { createContext, useContext } from "react";

type ContextValue = {
  hasSelectedMessages: boolean;
  getSelectHandler: (id: number | string) => () => void;
  getDeselectHandler: (id: number | string) => () => void;
  handleSelect: (id: number | string) => void;
  handleDeselect: (id: number | string) => void;
  selectedMessages: Array<number | string>;
};

const BaseMessagesContext = createContext<ContextValue>(null!);

const useBaseMessagesContext = () => {
  return useContext(BaseMessagesContext);
};

export { useBaseMessagesContext, BaseMessagesContext };
