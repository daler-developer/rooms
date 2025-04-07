import { forwardRef, useImperativeHandle, ReactNode, useEffect, useRef } from "react";
import { Scroll, useScrollControl } from "@/shared/ui";

type Props = {
  children: ReactNode[];
};

type BaseMessagesListHandle = {
  scrollToBottom: () => void;
  isScrolledToBottom: boolean;
};

const BaseMessagesList = forwardRef<BaseMessagesListHandle, Props>(({ children }, ref) => {
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

  return (
    <Scroll ref={scrollControl.ref} height="full">
      <div ref={wrapperEl} className="flex flex-col gap-6 pt-8 pb-8">
        {children}
      </div>
    </Scroll>
  );
});

export default BaseMessagesList;
