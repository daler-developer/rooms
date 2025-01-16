import { useEffect, useRef } from "react";

type AnyFunction = (...args: any[]) => any;

const useDidUpdateEffect = (fn: AnyFunction, inputs: unknown[]) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, inputs);
};

export default useDidUpdateEffect;
