import { Avatar, Badge, ContextMenu, MouseDownMove, ListGroup, useContextMenuControl } from "@/shared/ui";
import clsx from "clsx";
import { IconType } from "react-icons";
import { ReactNode, useEffect, useRef } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import BaseMessageSentAt from "./BaseMessageSentAt";
import BaseMessageViewsCount from "./BaseMessageViewsCount";
import BaseMessageDivider from "./BaseMessageDivider";
import { useBaseMessagesContext } from "./baseMessagesContext.tsx";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useLatest } from "@/shared/hooks";

export type Props = {
  id: number | string;
  text: string;
  senderIsMe: boolean;
  senderProfilePictureUrl?: string | null;
  senderIsOnline: boolean;
  senderFirstName: string;
  senderLastName: string;
  imageUrls: string[];
  onMessageVisible?: () => void;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
  intersectionAnchor?: HTMLElement;
  divider?: ReactNode;
  selectable?: boolean;
  contextMenuActions?: Array<{
    label: string;
    onClick: () => void;
    Icon: IconType;
  }>;
};

const BaseMessage = ({
  id,
  text,
  onMessageVisible,
  senderLastName,
  senderFirstName,
  senderProfilePictureUrl,
  senderIsOnline,
  senderIsMe,
  imageUrls,
  bottomLeft,
  bottomRight,
  divider,
  selectable = false,
  contextMenuActions = [],
}: Props) => {
  const contextMenuContext = useContextMenuControl();
  const rootElRef = useRef<HTMLDivElement>(null!);
  const baseMessagesContext = useBaseMessagesContext();
  const isSelected = baseMessagesContext.selectedMessages.includes(id);
  const onMessageVisibleRef = useLatest(onMessageVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onMessageVisibleRef.current?.();
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

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = () => {
    if (selectable && isSelected) {
      baseMessagesContext.handleDeselect(id);
    }

    if (selectable && !isSelected && baseMessagesContext.hasSelectedMessages) {
      baseMessagesContext.handleSelect(id);
    }
  };

  const messageElClasses = clsx("flex items-start select-none", {
    "ml-auto gap-2": senderIsMe,
    "gap-2 flex-row-reverse": !senderIsMe,
  });

  const containerElClasses = clsx("flex gap-2 pl-6 pr-6 rounded-md", {
    "": senderIsMe,
    "": !senderIsMe,
    "bg-black bg-opacity-[0.2]": isSelected || contextMenuContext.state.isOpen,
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

      <ContextMenu
        ref={contextMenuContext.ref}
        enabled={!baseMessagesContext.hasSelectedMessages}
        placement="bottom-left"
        placementFallback="bottom-right"
        content={
          <div>
            <ListGroup>
              <ListGroup.Item
                Icon={FaRegCircleCheck}
                onClick={() => {
                  baseMessagesContext.handleSelect(id);
                  contextMenuContext.close();
                }}
              >
                Select
              </ListGroup.Item>
              {contextMenuActions.map((action) => (
                <ListGroup.Item
                  key={action.label}
                  Icon={action.Icon}
                  onClick={() => {
                    contextMenuContext.close();
                    action.onClick();
                  }}
                >
                  {action.label}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        }
      >
        <MouseDownMove
          onMouseDownMove={() => {
            if (baseMessagesContext.hasSelectedMessages && !isSelected) {
              baseMessagesContext.handleSelect(id);
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
