import { useRef, MutableRefObject } from "react";

type AnyFunction = (...args: unknown[]) => unknown;

const useDebouncedFn = <T extends AnyFunction>(fn: T, delay: number = 20): T => {
  const timeout: MutableRefObject<ReturnType<typeof setTimeout> | null> = useRef(null);

  return (...args: unknown[]) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export default useDebouncedFn;
