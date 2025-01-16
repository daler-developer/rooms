import { FaCheck, FaTimes, FaExclamation } from "react-icons/fa";
import { ReactNode } from "react";

export type ToastSeverity = "success" | "warning" | "error";

type Props = {
  title: string;
  severity: ToastSeverity;
  onClose: () => void;
};

const Toast = ({ title, severity, onClose }: Props) => {
  const iconElementBySeverity: Record<ToastSeverity, ReactNode> = {
    success: (
      <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <div className="bg-green-500 rounded-full p-[4px]">
          <FaCheck className="text-white text-[10px]" />
          <span className="sr-only">Check icon</span>
        </div>
      </div>
    ),
    warning: (
      <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 bg-red-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <div className="bg-red-500 rounded-full p-[4px]">
          <FaTimes className="text-white text-[10px]" />
          <span className="sr-only">Check icon</span>
        </div>
      </div>
    ),
    error: (
      <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 bg-yellow-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <div className="bg-yellow-500 rounded-full p-[4px]">
          <FaExclamation className="text-white text-[10px]" />
          <span className="sr-only">Check icon</span>
        </div>
      </div>
    ),
  };

  return (
    <div className="flex items-center p-4 text-gray-500 bg-white rounded-lg shadow-lg dark:text-gray-400 dark:bg-gray-800" role="alert">
      {iconElementBySeverity[severity]}
      <div className="ms-3 text-sm font-normal">{title}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        onClick={() => onClose?.()}
      >
        <span className="sr-only">Close</span>
        <FaTimes className="text-[18px]" />
      </button>
    </div>
  );
};

export default Toast;
