import { useEffect, useRef } from "react";

const useWaitForDomUpdate = () => {
  const resolverRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (resolverRef.current) {
      resolverRef.current();
      resolverRef.current = null;
    }
  });

  return () => {
    return new Promise<void>((resolve) => {
      resolverRef.current = resolve;
    });
  };
};

export default useWaitForDomUpdate;
