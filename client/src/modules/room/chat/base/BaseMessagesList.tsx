import { forwardRef, useImperativeHandle, ReactNode, useEffect, useRef } from "react";
import { Scroll, useScrollControl } from "@/shared/ui";
import { BaseMessagesContext } from "./baseMessagesContext";

type Props = {
  children: ReactNode[];
  selectedMessages: Array<number | string>;
  onSelectedMessagesChange: (selectedMessages: Array<number | string>) => void;
};

type BaseMessagesListHandle = {
  scrollToBottom: () => void;
  isScrolledToBottom: boolean;
};

const BaseMessagesList = forwardRef<BaseMessagesListHandle, Props>(({ children, selectedMessages, onSelectedMessagesChange }, ref) => {
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
      <Scroll ref={scrollControl.ref} height="full">
        <div ref={wrapperEl} className="flex flex-col gap-6 pt-8 pb-8">
          {children}
        </div>
      </Scroll>
    </BaseMessagesContext.Provider>
  );
});

export default BaseMessagesList;
