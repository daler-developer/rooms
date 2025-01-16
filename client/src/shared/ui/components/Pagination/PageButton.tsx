import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  isActive: boolean;
  onClick?: () => void;
  children: ReactNode;
};

const PageButton = ({ isActive, onClick, children }: Props) => {
  return (
    <button
      className={clsx({
        "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600":
          isActive,
        "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0":
          !isActive,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PageButton;
