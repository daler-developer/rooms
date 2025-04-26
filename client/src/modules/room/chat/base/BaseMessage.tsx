import { Avatar, Badge, ContextMenu, MouseDownMove, ListGroup, useContextMenuControl } from "@/shared/ui";
import clsx from "clsx";
import { IconType } from "react-icons";
import { ReactNode, useEffect, useMemo, useRef } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import BaseMessageSentAt from "./BaseMessageSentAt";
import BaseMessageViewsCount from "./BaseMessageViewsCount";
import BaseMessageDivider from "./BaseMessageDivider";
import BaseMessageScheduledAt from "./BaseMessageScheduledAt.tsx";
import { useBaseMessagesContext } from "./baseMessagesContext.tsx";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useLatest, usePreciseClick } from "@/shared/hooks";

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

  const wrapperEl = usePreciseClick(() => {
    if (selectable && isSelected) {
      baseMessagesContext.handleDeselect(id);
    }

    if (selectable && !isSelected && baseMessagesContext.hasSelectedMessages) {
      baseMessagesContext.handleSelect(id);
    }
  });

  const messageElClasses = clsx("flex items-start select-none", {
    "ml-auto gap-2": senderIsMe,
    "gap-2 flex-row-reverse": !senderIsMe,
  });

  const containerElClasses = clsx("flex gap-2 pl-6 pr-6", {
    "bg-black bg-opacity-[0.2]": isSelected || contextMenuContext.state.isOpen,
  });

  const messageBodyClasses = clsx("relative min-w-[150px] rounded-lg");

  const checkIconClasses = clsx("text-[35px]", {
    invisible: !isSelected,
  });

  const senderClasses = clsx("absolute text-black text-[10px] font-medium pb-[2px]", {
    "right-[5px] bottom-full": senderIsMe,
    "left-[5px] bottom-full": !senderIsMe,
  });

  const items = useMemo(() => {
    const list: ReactNode[] = [];

    if (selectable) {
      list.push(
        <ListGroup.Item
          key="Select"
          Icon={FaRegCircleCheck}
          onClick={() => {
            baseMessagesContext.handleSelect(id);
            contextMenuContext.close();
          }}
        >
          Select
        </ListGroup.Item>,
      );
    }

    if (contextMenuActions) {
      contextMenuActions.forEach((action) => {
        list.push(
          <ListGroup.Item
            key={action.label}
            Icon={action.Icon}
            onClick={() => {
              contextMenuContext.close();
              action.onClick();
            }}
          >
            {action.label}
          </ListGroup.Item>,
        );
      });
    }

    return list;
  }, [id, contextMenuActions, selectable]);

  return (
    <div ref={wrapperEl}>
      {divider}

      <ContextMenu
        ref={contextMenuContext.ref}
        enabled={!baseMessagesContext.hasSelectedMessages && items.length > 0}
        placement="bottom-left"
        placementFallback="bottom-right"
        content={
          <div>
            <ListGroup>{items}</ListGroup>
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
          <div className={containerElClasses}>
            <HiOutlineCheckCircle className={checkIconClasses} />
            <div ref={rootElRef} className={messageElClasses}>
              <div className={messageBodyClasses}>
                {imageUrls.length > 0 && (
                  <div className="flex flex-col items-start">
                    {imageUrls.map((imageUrl) => (
                      <div className="max-w-[400px]" key={imageUrl}>
                        <img className="w-full h-full" src={imageUrl} alt="message-image" />
                      </div>
                    ))}
                  </div>
                )}
                <div
                  className={clsx("py-[2px] px-[6px] text-[14px] pb-[300px]", {
                    "flex flex-col bg-indigo-500 text-white": senderIsMe,
                    "flex flex-col bg-white": !senderIsMe,
                  })}
                >
                  <span>{text}</span>
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
BaseMessage.ScheduledAt = BaseMessageScheduledAt;
BaseMessage.ViewsCount = BaseMessageViewsCount;
BaseMessage.Divider = BaseMessageDivider;

export default BaseMessage;
