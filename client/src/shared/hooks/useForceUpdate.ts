import { useState } from "react";

const useForceUpdate = () => {
  const [_, setState] = useState(1);

  return () => {
    setState((prev) => prev + 1);
  };
};

export default useForceUpdate;
