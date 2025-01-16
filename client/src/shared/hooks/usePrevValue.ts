import { MutableRefObject, useEffect, useRef } from "react";

const usePrevValue = <T>(value: T) => {
  const prevValueRef = useRef() as MutableRefObject<T>;

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  return prevValueRef.current;
};

export default usePrevValue;
