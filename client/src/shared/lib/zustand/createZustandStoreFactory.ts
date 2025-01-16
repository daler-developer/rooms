import { create, StateCreator } from "zustand";
import { createContext, createElement, ReactNode, useContext, useRef } from "react";

const createZustandStoreFactory = <TState>(createStoreOptions: StateCreator<TState>) => {
  const createStore = () => {
    return create<TState>(createStoreOptions);
  };

  type Result = ReturnType<typeof createStore>;

  const Context = createContext<Result>(null!);

  type Props = {
    children: ReactNode;
    initialState?: Partial<TState>;
  };

  const Provider = ({ children }: Props) => {
    const storeRef = useRef<Result>(null!);

    if (storeRef.current === null) {
      storeRef.current = createStore();
    }

    return createElement(Context.Provider, { children, value: storeRef.current });
  };

  const useStore = () => {
    return useContext(Context)();
  };

  return {
    Provider,
    useStore,
  };
};

export default createZustandStoreFactory;
