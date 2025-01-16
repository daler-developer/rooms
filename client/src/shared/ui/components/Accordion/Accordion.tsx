import { Fragment, ReactNode, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import clsx from "clsx";

type AccordionItem = {
  title: string;
  content: ReactNode;
};

type Props = {
  items: AccordionItem[];
};

const Accordion = ({ items }: Props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(-1);

  const itemsCount = items.length;

  const handleItemClick = (itemIndex: number) => () => {
    setActiveItemIndex(itemIndex);
  };

  const buttonClasses = (itemIndex: number) => {
    const isFirstItem = itemIndex === 0;
    const isLastItem = itemIndex === itemsCount - 1;
    const isMiddleItem = !isFirstItem && !isLastItem;

    return clsx({
      "flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3":
        isFirstItem,
      'flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-2':
        isMiddleItem,
      "flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3":
        isLastItem,
    });
  };

  const contentWrapperClasses = (itemIndex: number) => {
    const isLastItem = itemIndex === itemsCount - 1;

    return clsx({
      "p-5 border border-b-0 border-gray-200 dark:border-gray-700": !isLastItem,
      "p-5 border border-t-0 border-gray-200 dark:border-gray-700": isLastItem,
    });
  };

  const iconClasses = (itemIndex: number) => {
    return clsx("shrink-0 text-[22px]", {
      "rotate-180": showItem(itemIndex),
    });
  };

  const showItem = (itemIndex: number) => {
    return itemIndex === activeItemIndex;
  };

  return (
    <div>
      {items.map((item, index) => (
        <Fragment key={index}>
          <h2>
            <button type="button" className={buttonClasses(index)} onClick={handleItemClick(index)}>
              <span>{item.title}</span>
              <HiChevronDown className={iconClasses(index)} />
            </button>
          </h2>

          {showItem(index) && <div className={contentWrapperClasses(index)}>{item.content}</div>}
        </Fragment>
      ))}
    </div>
  );
};

export default Accordion;
