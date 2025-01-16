import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { useSpring, animated } from "@react-spring/web";
import { Item } from "./types.ts";
import { Link } from "react-router-dom";

type Props = Item;

const SidebarItem = ({ Icon, children, text, to }: Props) => {
  const [showChildren, setShowChildren] = useState(false);

  const [props, api] = useSpring(() => ({
    from: {
      rotate: 0,
    },
  }));

  const handleClick = () => {
    if (showChildren) {
      api.start({
        from: {
          rotate: 180,
        },
        to: {
          rotate: 0,
        },
      });
      setShowChildren(false);
    } else {
      api.start({
        from: {
          rotate: 0,
        },
        to: {
          rotate: 180,
        },
      });
      setShowChildren(true);
    }
  };

  const hasChildren = Boolean(children);

  return (
    <li>
      {hasChildren ? (
        <button
          type="button"
          className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          onClick={handleClick}
        >
          {<Icon className="text-2xl" />}
          <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{text}</span>
          {hasChildren && (
            <animated.span style={{ ...props }}>
              <HiChevronDown className="text-xl" />
            </animated.span>
          )}
        </button>
      ) : (
        <Link
          className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          to={to!}
        >
          {<Icon className="text-2xl" />}
          <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{text}</span>
        </Link>
      )}
      {hasChildren && showChildren && (
        <ul className="py-2 space-y-2">
          {children!.map((childItem) => (
            <li>
              <Link
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                to={childItem.to}
              >
                {childItem.text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
