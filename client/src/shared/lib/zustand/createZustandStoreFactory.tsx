import { create, StateCreator } from "zustand";
import { createContext, createElement, ReactNode, useContext, useRef, ComponentType, forwardRef, ElementRef, ComponentProps } from "react";

const createZustandStoreFactory = <TState,>(createStoreOptions: StateCreator<TState>) => {
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

  const withStore = <TComponent extends ComponentType<any>>(WrappedComponent: TComponent) => {
    return forwardRef<ElementRef<TComponent>, ComponentProps<TComponent>>((props, ref) => {
      return (
        <Provider>
          <WrappedComponent ref={ref} {...props} />
        </Provider>
      );
    });
  };

  const useStore = () => {
    return useContext(Context)();
  };

  return {
    useStore,
    withStore,
  };
};

export default createZustandStoreFactory;
