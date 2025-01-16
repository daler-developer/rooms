import clsx from "clsx";
import { forwardRef, ForwardedRef } from "react";

type Props = {
  isActive: boolean;
  onClick: () => void;
  children: string;
};

const Tab = forwardRef(({ isActive, onClick, children }: Props, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <button
      className={clsx("pt-0", {
        "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none": !isActive,
        "text-blue-500 py-4 px-6 block focus:outline-none": isActive,
      })}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </button>
  );
});

export default Tab;
