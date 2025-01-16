import Tab from "./Tab.tsx";
import { useLayoutEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

type TabItem = {
  value: string;
  title: string;
};

type Props = {
  items: TabItem[];
  value: string;
  onChange: (tab: string) => void;
};

const Tabs = ({ items, value, onChange }: Props) => {
  const tabRefs = useRef<{ [key: string]: HTMLElement }>({});
  const navElRef = useRef<HTMLElement>(null);

  const [springs, api] = useSpring(() => ({
    from: {
      left: 200,
      width: 200,
    },
  }));

  useLayoutEffect(() => {
    resetSliderPosition();
  }, []);

  const resetSliderPosition = () => {
    const activeTabEl = tabRefs.current[value];

    const clientRect = activeTabEl.getBoundingClientRect();

    const width = clientRect.width;
    const left = activeTabEl.offsetLeft + clientRect.width / 2 - width / 2;

    api.set({
      left,
      width: clientRect.width,
    });
  };

  const handleTabClick = (tab: TabItem) => () => {
    const activeTabEl = tabRefs.current[tab.value];

    const clientRect = activeTabEl.getBoundingClientRect();

    const width = clientRect.width;
    const left = activeTabEl.offsetLeft + clientRect.width / 2 - width / 2;

    api.start({
      to: {
        left,
        width: clientRect.width,
      },
    });

    onChange(tab.value);
  };

  const handleScroll = () => {
    resetSliderPosition();
  };

  return (
    <div className="bg-white">
      <nav ref={navElRef} className="flex overflow-auto relative" onScroll={handleScroll}>
        {items.map((item) => (
          <Tab
            key={item.value}
            isActive={value === item.value}
            onClick={handleTabClick(item)}
            ref={(el) => {
              tabRefs.current[item.value] = el!;
            }}
          >
            {item.title}
          </Tab>
        ))}

        <animated.div
          className="border-blue-500 border-b-2 w-[100px] text-blue-500 bottom-0 absolute"
          style={{
            ...springs,
          }}
        />
      </nav>
    </div>
  );
};

export default Tabs;
