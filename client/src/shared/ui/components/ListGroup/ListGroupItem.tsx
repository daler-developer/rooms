import clsx from "clsx";
import { IconType } from "react-icons";
import { useListGroupContext } from "./listGroupContext.ts";
import { useListGroupItemContext } from "./listGroupItemContext.ts";

type Props = {
  children: string;
  Icon?: IconType;
  onClick?: () => void;
};

const ListGroupItem = ({ Icon, children, onClick }: Props) => {
  const listGroupContext = useListGroupContext();
  const listGroupItemContext = useListGroupItemContext();

  const isFirst = listGroupItemContext.index === 0;
  const isLast = listGroupItemContext.index + 1 === listGroupContext.totalItems;

  const rootClasses = clsx("flex items-center gap-2", {
    "relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white":
      isFirst,
    "relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white":
      !isFirst && !isLast,
    "relative inline-flex items-center w-full px-4 py-2 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white":
      isLast,
  });

  return (
    <button type="button" className={rootClasses} onClick={onClick}>
      {/*<div className="w-[20px]">{Icon && <Icon className="text-[18px]" />}</div>*/}
      {children}
    </button>
  );
};

export default ListGroupItem;
