import { Scroll, Spinner, type ScrollHandle } from "@/shared/ui";
import { forwardRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  onScrollToTop: () => void;
  onReachTopThreshold(): void;
  showSpinner: boolean;
};

const BaseMessagesList = forwardRef<ScrollHandle, Props>(({ children, onReachTopThreshold, onScrollToTop, showSpinner }, ref) => {
  return (
    <Scroll
      ref={ref}
      className="flex-grow"
      height={500}
      onScrollToTop={onScrollToTop}
      onReachTopThreshold={onReachTopThreshold}
      topThreshold={200}
      scrollToBottomOnMount
    >
      <div className="pt-4 pb-4">
        {showSpinner && (
          <div className="flex justify-center pb-4">
            <Spinner size="lg" />
          </div>
        )}

        <ul className="flex flex-col gap-2">{children}</ul>
      </div>
    </Scroll>
  );
});

export default BaseMessagesList;
