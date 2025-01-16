import { Avatar, BadgeColor, ContextMenu, MouseDownMove } from "@/shared/ui";
import clsx from "clsx";
import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi2";

type Props = {
  children: ReactNode;
  contextMenuItems?: ComponentProps<typeof ContextMenu>["items"];
  align: "start" | "end";
  isInSelectMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onDeselect?: () => void;
  profilePictureUrl?: string;
  avatarBadgeColor: BadgeColor;
  bottomRight?: ReactNode;
  bottomLeft?: ReactNode;
  intersectionAnchor?: HTMLElement;
  onIntersect?: () => void;
};

const Message = ({
  children,
  contextMenuItems,
  avatarBadgeColor,
  align,
  isInSelectMode = false,
  isSelected = false,
  onSelect,
  onDeselect,
  profilePictureUrl,
  bottomRight,
  bottomLeft,
  intersectionAnchor,
  onIntersect,
}: Props) => {
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const rootElRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (onIntersect) {
      observer = new IntersectionObserver(
        async (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              onIntersect?.();
            }
          }
        },
        {
          root: undefined,
          threshold: 1,
          rootMargin: "0px",
        },
      );

      observer.observe(rootElRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [intersectionAnchor, onIntersect]);

  const handleClick = () => {
    if (isInSelectMode) {
      if (isSelected) {
        onDeselect?.();
      } else {
        onSelect?.();
      }
    }
  };

  const messageElClasses = clsx("flex items-start select-none", {
    "ml-auto gap-2": align === "end",
    "gap-2 flex-row-reverse": align === "start",
  });

  const containerElClasses = clsx("flex gap-2 pl-6 pr-6 rounded-md", {
    "": align === "end",
    "": align === "start",
    "bg-black bg-opacity-[0.2]": isSelected || isContextMenuVisible,
  });

  const messageBodyClasses = clsx("min-w-[150px] py-[2px] px-[6px]", {
    "flex flex-col bg-indigo-500 text-white rounded-lg": align === "end",
    "flex flex-col bg-white rounded-lg": align === "start",
  });

  const checkIconClasses = clsx("text-[35px]", {
    invisible: !isSelected,
  });

  return (
    <ContextMenu items={contextMenuItems} onShow={() => setIsContextMenuVisible(true)} onHide={() => setIsContextMenuVisible(false)}>
      <MouseDownMove
        onMouseDownMove={() => {
          if (isInSelectMode) {
            onSelect?.();
          }
        }}
      >
        <div className={containerElClasses} onClick={handleClick}>
          <HiOutlineCheckCircle className={checkIconClasses} />
          <div ref={rootElRef} className={messageElClasses}>
            <div className={messageBodyClasses}>
              <div>{children}</div>
              <div className="mt-2 flex items-center justify-between">
                <div>{bottomLeft}</div>
                <div>{bottomRight}</div>
              </div>
            </div>
            <Avatar src={profilePictureUrl} size="sm" withBadge badgeColor={avatarBadgeColor} />
          </div>
        </div>
      </MouseDownMove>
    </ContextMenu>
  );
};

export default Message;
