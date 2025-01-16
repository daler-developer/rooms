import { createContext, ReactNode, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Portal from "../Portal/Portal.tsx";

import Toast, { ToastSeverity } from "./Toast.tsx";

type Props = {
  children: ReactNode;
};

export type Toast = {
  info(title: string): void;
};

export const ToastContext = createContext<Toast>(null!);

const ToastProvider = ({ children }: Props) => {
  const [toasts, setToasts] = useState<Array<{ title: string; severity: ToastSeverity; id: string }>>([]);

  const contextValue = {
    info(title: string) {
      const newToast = { title, severity: "info" as const, id: uuidv4() };

      setToasts((prev) => {
        return [...prev, newToast];
      });

      setTimeout(() => {
        setToasts((prev) => {
          return prev.filter((toast) => toast.id !== newToast.id);
        });
      }, 3000);
    },
  };

  const handleToastClose = (toastId: string) => {
    setToasts((prev) => {
      return prev.filter((toast) => toast.id !== toastId);
    });
  };

  return (
    <>
      <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>

      <Portal>
        <div className="w-[400px] fixed top-5 right-5 flex flex-col gap-y-1">
          {toasts.map((toast) => (
            <Toast key={toast.id} title={toast.title} severity={toast.severity} onClose={() => handleToastClose(toast.id)} />
          ))}
        </div>
      </Portal>
    </>
  );
};

export default ToastProvider;
