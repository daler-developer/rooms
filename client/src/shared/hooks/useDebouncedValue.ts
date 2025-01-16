import { useEffect, useRef, useState } from "react";

const useDebouncedValue = <T>(value: T) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const timeout = useRef<number | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    timeout.current = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
  }, [value]);

  return debouncedValue;
};

export default useDebouncedValue;
