import { Avatar, Badge, ContextMenu, MouseDownMove } from "@/shared/ui";
import clsx from "clsx";
import dayjs from "dayjs";
import { ComponentProps, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineCheckCircle, HiOutlineEye } from "react-icons/hi2";
import BaseMessageSentAt from "./BaseMessageSentAt";
import BaseMessageViewsCount from "./BaseMessageViewsCount";
import BaseMessageDivider from "./BaseMessageDivider";

export type Props = {
  text: string;
  contextMenuItems?: ComponentProps<typeof ContextMenu>["items"];
  isInSelectMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onDeselect?: () => void;
  intersectionAnchor?: HTMLElement;
  onIntersect?: () => void;
  senderIsMe: boolean;
  senderProfilePictureUrl?: string | null;
  senderIsOnline: boolean;
  senderFirstName: string;
  senderLastName: string;
  imageUrls: string[];
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
  divider?: ReactNode;
};

const BaseMessage = ({
  text,
  contextMenuItems,
  isInSelectMode = false,
  isSelected = false,
  onSelect,
  onDeselect,
  intersectionAnchor,
  onIntersect,
  senderLastName,
  senderFirstName,
  senderProfilePictureUrl,
  senderIsOnline,
  senderIsMe,
  imageUrls,
  bottomLeft,
  bottomRight,
  divider,
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
    "ml-auto gap-2": senderIsMe,
    "gap-2 flex-row-reverse": !senderIsMe,
  });

  const containerElClasses = clsx("flex gap-2 pl-6 pr-6 rounded-md", {
    "": senderIsMe,
    "": !senderIsMe,
    "bg-black bg-opacity-[0.2]": isSelected || isContextMenuVisible,
  });

  const messageBodyClasses = clsx("relative min-w-[150px] py-[2px] px-[6px] text-[14px]", {
    "flex flex-col bg-indigo-500 text-white rounded-lg": senderIsMe,
    "flex flex-col bg-white rounded-lg": !senderIsMe,
  });

  const checkIconClasses = clsx("text-[35px]", {
    invisible: !isSelected,
  });

  const senderClasses = clsx("absolute text-black text-[10px] font-medium pb-[2px]", {
    "right-[5px] bottom-full": senderIsMe,
    "left-[5px] bottom-full": !senderIsMe,
  });

  return (
    <div>
      {divider}

      <ContextMenu items={contextMenuItems} onShow={() => setIsContextMenuVisible(true)} onHide={() => setIsContextMenuVisible(false)}>
        <MouseDownMove
          onMouseDownMove={() => {
            if (isInSelectMode && !isSelected) {
              onSelect?.();
            }
          }}
        >
          <div className={containerElClasses} onClick={handleClick}>
            <HiOutlineCheckCircle className={checkIconClasses} />
            <div ref={rootElRef} className={messageElClasses}>
              <div className={messageBodyClasses}>
                <div className="pr-[8px]">
                  {imageUrls.length > 0 && (
                    <div className="grid grid-rows-[100px] grid-cols-[100px] gap-2 grid-flow-col auto-cols-[100px]">
                      {imageUrls.map((imageUrl) => (
                        <div key={imageUrl}>
                          <img className="w-full h-full" src={imageUrl} alt="message-image" />
                        </div>
                      ))}
                    </div>
                  )}

                  {text}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div
                    className={clsx({
                      "text-white": senderIsMe,
                    })}
                  >
                    {bottomLeft}
                  </div>

                  <div
                    className={clsx({
                      "text-white": senderIsMe,
                    })}
                  >
                    {bottomRight}
                  </div>
                </div>

                <div className={senderClasses}>
                  {senderFirstName} {senderLastName}
                </div>
              </div>
              <Avatar size="sm" src={senderProfilePictureUrl} badgeContent={<Badge size="sm" badgeColor={senderIsOnline ? "green" : "gray"} />} />
            </div>
          </div>
        </MouseDownMove>
      </ContextMenu>
    </div>
  );
};

BaseMessage.SentAt = BaseMessageSentAt;
BaseMessage.ViewsCount = BaseMessageViewsCount;
BaseMessage.Divider = BaseMessageDivider;

export default BaseMessage;
