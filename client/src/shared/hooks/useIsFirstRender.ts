import { useRef } from "react";

const useIsFirstRender = () => {
  const isFirstRender = useRef(true);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    return true;
  }

  return false;
};

export default useIsFirstRender;
