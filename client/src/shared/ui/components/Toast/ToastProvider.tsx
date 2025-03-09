import { createContext, ReactNode, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Portal from "../Portal/Portal.tsx";

import Toast, { ToastSeverity } from "./Toast.tsx";

type Props = {
  children: ReactNode;
};

export type ToastContextValue = {
  success(title: string): void;
  warning(title: string): void;
  error(title: string): void;
};

export const ToastContext = createContext<ToastContextValue>(null!);

type Toast = {
  id: string;
  title: string;
  severity: ToastSeverity;
};

const ToastProvider = ({ children }: Props) => {
  const [toasts, setToasts] = useState<Array<Toast>>([]);

  const contextValue = (["success", "warning", "error"] as const).reduce((accum, item) => {
    return {
      ...accum,
      [item](title: string) {
        const newToast: Toast = { title, severity: item, id: uuidv4() };

        setToasts((prev) => {
          return [...prev, newToast];
        });

        setTimeout(() => {
          setToasts((prev) => {
            return prev.filter((toast) => toast.id !== newToast.id);
          });
        }, 6000);
      },
    };
  }, {}) as ToastContextValue;

  const handleToastClose = (toastId: string) => {
    setToasts((prev) => {
      return prev.filter((toast) => toast.id !== toastId);
    });
  };

  return (
    <>
      <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>

      <Portal>
        <div className="w-[400px] fixed top-5 right-5 flex flex-col gap-y-2">
          {toasts.map((toast) => (
            <Toast key={toast.id} title={toast.title} severity={toast.severity} onClose={() => handleToastClose(toast.id)} />
          ))}
        </div>
      </Portal>
    </>
  );
};

export default ToastProvider;
