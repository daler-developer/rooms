import { useRef, MutableRefObject } from "react";

type AnyFunction<P> = (...args: P[]) => any;

const useDebouncedFnCancellable = <P extends Array<unknown>>(fn: AnyFunction<P>, delay: number = 20) => {
  const timeout: MutableRefObject<ReturnType<typeof setTimeout> | null> = useRef(null);
  const isCancelled = useRef(false);

  return {
    exec(...args: P) {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        fn({}, ...args);
      }, delay);
    },
    cancel() {},
  };
};

export default useDebouncedFnCancellable;
