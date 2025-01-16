import { HiChevronRight } from "react-icons/hi2";
import { IconType } from "react-icons";

type BreadcrumbItem = {
  text: string;
  Icon?: IconType;
};

type Props = {
  items: BreadcrumbItem[];
};

const Breadcrumb = ({ items }: Props) => {
  const itemsLength = items.length;

  return (
    <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {items.map((item, index) => {
          const isLast = index + 1 === itemsLength;

          return (
            <li className="inline-flex items-center gap-2">
              <a
                href="#"
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                {item.Icon && <item.Icon className="text-sm" />}
                {item.text}
              </a>
              {!isLast && <HiChevronRight className="font-bold" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
