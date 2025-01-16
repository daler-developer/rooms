import { useRef, MutableRefObject } from "react";

type AnyFunction = (...args: any[]) => any;

const useDebouncedFn = <T extends AnyFunction>(fn: T, delay: number = 20) => {
  const timeout: MutableRefObject<ReturnType<typeof setTimeout> | null> = useRef(null);

  return (...args: Parameters<T>) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export default useDebouncedFn;
