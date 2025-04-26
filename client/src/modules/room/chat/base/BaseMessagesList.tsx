import { forwardRef, useImperativeHandle, ReactNode, useEffect, useRef, useMemo, Children } from "react";
import { Empty, Scroll, useScrollControl } from "@/shared/ui";
import { BaseMessagesContext } from "./baseMessagesContext";

type Props = {
  children: ReactNode[];
  selectedMessages: Array<number | string>;
  onSelectedMessagesChange: (selectedMessages: Array<number | string>) => void;
  onReachStart?: () => void;
  noDataMessage: string;
  onMore?: () => void;
};

type BaseMessagesListHandle = {
  scrollToBottom: () => void;
  isScrolledToBottom: boolean;
};

const BaseMessagesList = forwardRef<BaseMessagesListHandle, Props>(
  ({ children, onReachStart, selectedMessages, onSelectedMessagesChange, noDataMessage, onMore }, ref) => {
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

    const showNoData = Children.count(children) === 0;
    const showData = Children.count(children) > 0;

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
        {showNoData && (
          <div className="h-full flex items-center justify-center">
            <Empty title={noDataMessage} />
          </div>
        )}

        {showData && (
          <Scroll
            ref={scrollControl.ref}
            height="full"
            onScrollToTop={() => {
              onReachStart?.();
            }}
            onReachTopThreshold={[
              {
                threshold: 500,
                handler() {
                  onMore?.();
                },
              },
            ]}
          >
            <div ref={wrapperEl} className="flex flex-col gap-6 pt-8 pb-8">
              {children}
            </div>
          </Scroll>
        )}
      </BaseMessagesContext.Provider>
    );
  },
);

export default BaseMessagesList;
