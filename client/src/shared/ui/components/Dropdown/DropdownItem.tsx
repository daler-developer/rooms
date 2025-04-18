import Spinner from "../Spinner/Spinner.tsx";
import clsx from "clsx";
import { IconType } from "react-icons";

type Props = {
  label: string;
  onClick?: () => void;
  color?: "default" | "danger";
  isLoading?: boolean;
  to?: string;
  Icon?: IconType;
};

const DropdownItem = ({ label, onClick, color, isLoading, to }: Props) => {
  const classes = clsx("flex items-center gap-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer", {
    "text-red-500": color === "danger",
  });

  return (
    <div key={label} className={classes} onClick={onClick}>
      <span>{label}</span>
      {isLoading && <Spinner size="sm" />}
    </div>
  );
};

export default DropdownItem;
