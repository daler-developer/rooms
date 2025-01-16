import { useContext } from "react";

import { ToastContext } from "./ToastProvider.tsx";

const useToast = () => {
  return useContext(ToastContext);
};

export default useToast;
