import mitt, { EventType, Emitter } from "mitt";
import { ComponentType, createContext, ReactNode, useContext, useRef } from "react";

const createEmitter = <TEvents extends Record<EventType, unknown>>() => {
  type ContextValue = Emitter<TEvents>;

  const Context = createContext<ContextValue>(null!);

  type Props = {
    children: ReactNode;
  };

  const Provider = ({ children }: Props) => {
    const emitter = useRef<Emitter<TEvents>>(null!);

    if (emitter.current === null) {
      emitter.current = mitt<TEvents>();
    }

    return <Context.Provider value={emitter.current}>{children}</Context.Provider>;
  };

  const withEmitter = <TProps extends object>(WrappedComponent: ComponentType<TProps>) => {
    return (props: TProps) => {
      return (
        <Provider>
          <WrappedComponent {...props} />
        </Provider>
      );
    };
  };

  const useEmitter = () => {
    return useContext(Context);
  };

  return {
    withEmitter,
    useEmitter,
  };
};

export { createEmitter };
