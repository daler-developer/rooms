import { forwardRef, useImperativeHandle, ReactNode, useEffect, useRef } from "react";
import { Scroll, useScrollControl } from "@/shared/ui";
import { BaseMessagesContext } from "./baseMessagesContext";

type Props = {
  children: ReactNode[];
  selectedMessages: Array<number | string>;
  onSelectedMessagesChange: (selectedMessages: Array<number | string>) => void;
  onReachStart?: () => void;
};

type BaseMessagesListHandle = {
  scrollToBottom: () => void;
  isScrolledToBottom: boolean;
};

const BaseMessagesList = forwardRef<BaseMessagesListHandle, Props>(({ children, onReachStart, selectedMessages, onSelectedMessagesChange }, ref) => {
  const scrollControl = useScrollControl();

  useEffect(() => {
    scrollControl.scrollToBottom();
  }, []);

  const wrapperEl = useRef<HTMLDivElement>(null!);

  useImperativeHandle(ref, () => ({
    scrollToBottom() {
      scrollControl.scrollToBottom();
    },
    isScrolledToBottom: scrollControl.isScrolledToBottom,
  }));

  const getSelectHandler = (messageId: number | string) => {
    return () => {
      onSelectedMessagesChange?.([...selectedMessages, messageId]);
    };
  };

  const getDeselectHandler = (messageId: number | string) => {
    return () => {
      onSelectedMessagesChange?.(selectedMessages.filter((id) => id !== messageId));
    };
  };

  return (
    <BaseMessagesContext.Provider
      value={{
        hasSelectedMessages: selectedMessages.length > 0,
        getSelectHandler,
        getDeselectHandler,
        handleSelect(messageId) {
          onSelectedMessagesChange?.([...selectedMessages, messageId]);
        },
        handleDeselect(messageId) {
          onSelectedMessagesChange?.(selectedMessages.filter((id) => id !== messageId));
        },
        selectedMessages,
      }}
    >
      <div className="h-full">
        <Scroll
          ref={scrollControl.ref}
          height="full"
          onScrollToTop={() => {
            onReachStart?.();
          }}
        >
          <div ref={wrapperEl} className="flex flex-col gap-6 pt-8 pb-8">
            {children}
          </div>
        </Scroll>
      </div>
    </BaseMessagesContext.Provider>
  );
});

export default BaseMessagesList;
