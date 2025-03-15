import { Avatar, ContextMenu, MouseDownMove } from "@/shared/ui";
import clsx from "clsx";
import { ComponentProps, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineCheckCircle, HiOutlineEye } from "react-icons/hi2";
import dayjs from "dayjs";

type Props = {
  children: ReactNode;
  contextMenuItems?: ComponentProps<typeof ContextMenu>["items"];
  isInSelectMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onDeselect?: () => void;
  intersectionAnchor?: HTMLElement;
  onIntersect?: () => void;
  senderIsMe: boolean;
  senderProfilePictureUrl?: string;
  senderIsOnline: boolean;
  senderFirstName: string;
  senderLastName: string;
  viewsCount?: number;
  renderViewsCount?: (content: ReactNode) => ReactNode;
  sentAt?: string;
  scheduledAt?: string;
  imageUrls: string[];
};

const Message = ({
  children,
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
  viewsCount,
  sentAt,
  scheduledAt,
  senderIsMe,
  renderViewsCount = (el) => el,
  imageUrls,
}: Props) => {
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const rootElRef = useRef<HTMLDivElement>(null!);

  const hasViewsCount = typeof viewsCount === "number";

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

  const messageBodyClasses = clsx("relative min-w-[150px] py-[2px] px-[6px]", {
    "flex flex-col bg-indigo-500 text-white rounded-lg": senderIsMe,
    "flex flex-col bg-white rounded-lg": !senderIsMe,
  });

  const checkIconClasses = clsx("text-[35px]", {
    invisible: !isSelected,
  });

  const senderClasses = clsx("absolute text-black text-[11px] font-medium", {
    "right-[5px] bottom-full": senderIsMe,
    "left-[5px] bottom-full": !senderIsMe,
  });

  const viewsCountEl = (
    <div className="flex items-center gap-1">
      <HiOutlineEye className="text-[15px]" />
      <span className="text-[12px]">{viewsCount}</span>
    </div>
  );

  const formattedSentAt = useMemo(() => {
    if (!sentAt) {
      return "";
    }

    return `${String(dayjs(sentAt).hour()).padStart(2, "0")}:${String(dayjs(sentAt).minute()).padStart(2, "0")}`;
  }, [sentAt]);

  const formattedScheduledAt = useMemo(() => {
    if (!scheduledAt) {
      return "";
    }

    return `Scheduled at: ${String(dayjs(scheduledAt).hour()).padStart(2, "0")}:${String(dayjs(scheduledAt).minute()).padStart(2, "0")}`;
  }, [scheduledAt]);

  return (
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

                {children}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>{hasViewsCount && renderViewsCount(viewsCountEl)}</div>

                <div>
                  {sentAt && <span className="text-[11px]">{formattedSentAt}</span>}
                  {scheduledAt && <span className="text-[10px] italic">{formattedScheduledAt}</span>}
                </div>
              </div>

              <div className={senderClasses}>
                {senderFirstName} {senderLastName}
              </div>
            </div>
            <Avatar src={senderProfilePictureUrl} size="sm" withBadge badgeColor={senderIsOnline ? "green" : "gray"} />
          </div>
        </div>
      </MouseDownMove>
    </ContextMenu>
  );
};

export default Message;
