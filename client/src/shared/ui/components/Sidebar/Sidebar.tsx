import { Item } from "./types.ts";
import SidebarItem from "./SidebarItem.tsx";
import { ComponentProps } from "react";
import { HiCog6Tooth } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar.tsx";

type Props = {
  items: Item[];
  logo?: {
    img: ComponentProps<"img">["src"];
    alt: ComponentProps<"img">["alt"];
    text: string;
  };
  userInfo: {
    img: ComponentProps<"img">["src"];
    title: string;
    subTitle: string;
  };
};

const Sidebar = ({ items, logo, userInfo }: Props) => {
  return (
    <aside className="w-full z-40 h-screen transition-transform translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        {logo && (
          <Link to="/" className="flex items-center ps-2.5 mb-5">
            <img src={logo.img} alt={logo.alt} className="h-6 me-3 sm:h-7" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">{logo.text}</span>
          </Link>
        )}

        <div className="flex items-center justify-between px-2 py-5">
          <div className="flex items-center mr-5">
            <div className="mr-5 shrink-0">
              <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
                <Avatar size="sm" src={userInfo.img} alt="user info img" className="shrink-0 inline-block" />
              </div>
            </div>
            <div className="mr-2">
              <span className="dark:hover:text-primary hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium dark:text-neutral-400/90 text-secondary-inverse">
                {userInfo.title}
              </span>
              <span className="text-secondary-dark dark:text-stone-500 font-medium block text-[0.85rem]">{userInfo.subTitle}</span>
            </div>
          </div>
          <HiCog6Tooth className="shrink-0 w-5 h-5" />
        </div>

        <ul className="space-y-2 font-medium">
          {items.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
