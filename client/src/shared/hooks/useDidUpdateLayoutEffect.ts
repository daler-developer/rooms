import { useLayoutEffect, useRef } from "react";

type AnyFunction = (...args: any[]) => any;

const useDidUpdateLayoutEffect = (fn: AnyFunction, inputs: unknown[]) => {
  const didMountRef = useRef(false);

  useLayoutEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, inputs);
};

export default useDidUpdateLayoutEffect;
