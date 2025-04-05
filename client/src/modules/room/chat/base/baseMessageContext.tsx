import { createContext, useContext, type ReactNode } from "react";
import type { Props as BaseMessageProps } from "./BaseMessage";

const BaseMessageContext = createContext<BaseMessageProps>(null!);

type Props = {
  children: ReactNode;
};

export const BaseMessageContextProvider = ({ children }: Props) => {
  return <BaseMessageContext.Provider value={value}>{children}</BaseMessageContext.Provider>;
};

export const useBaseMessageContext = () => useContext(BaseMessageContext);
