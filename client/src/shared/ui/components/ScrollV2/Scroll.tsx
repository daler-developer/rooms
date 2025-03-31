import { CSSProperties, forwardRef, ReactNode, UIEvent, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import cls from "@/shared/lib/classnames";
import { usePrevValue } from "@/shared/hooks";
import { MdOutlineArrowDownward } from "react-icons/md";
import { IconButton } from "@/shared/ui";
import ScrollHint from "./ScrollHint";

type Props = {
  children: ReactNode;
  className?: string;
  onScrollToBottom?: () => void;
  onScrollToRight?: () => void;
  onScrollToTop?: () => void;
  onScrollToTopWithThreshold?: () => void;
  onScrollToLeft?: () => void;
  height?: number | string;
  scrollToBottomOnMount?: boolean;
  onReachTopThreshold?: () => void;
  topThreshold?: number;
  showScrollToBottomButton?: boolean;
  maxHeight?: number;
  onReachBottomThreshold?: () => void;
  bottomThreshold?: number;
};

export type ScrollHandle = {
  scrollToBottom: () => void;
  isScrolledToBottom: () => boolean;
  subscribeToIsScrolledToBottomChanged: (handler: (to: boolean) => void) => () => void;
};

const Scroll = forwardRef<ScrollHandle, Props>(
  (
    {
      children,
      height = "auto",
      className,
      onScrollToBottom,
      onScrollToRight,
      onScrollToTop,
      onScrollToTopWithThreshold,
      onScrollToLeft,
      onReachTopThreshold,
      topThreshold = 100,
      showScrollToBottomButton = false,

      onReachBottomThreshold,
      bottomThreshold = 100,
    },
    ref,
  ) => {
    const [scrollTop, setScrollTop] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [clientWidth, setClientWidth] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(0);

    const prevScrollTop = usePrevValue(scrollTop);

    const isLastScrollToBottom = useMemo(() => {
      if (prevScrollTop === null) {
        return false;
      }

      return prevScrollTop < scrollTop;
    }, [prevScrollTop, scrollTop]);

    const scrollableEl = useRef<HTMLDivElement>(null!);
    const containerEl = useRef<HTMLDivElement>(null!);

    const scrollToBottom = () => {
      scrollableEl.current.scrollTo({
        top: scrollableEl.current.scrollHeight,
        behavior: "instant",
      });
    };

    useEffect(() => {
      const containerElCopy = scrollableEl.current;

      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];

        setClientWidth(entry.contentRect.width);
        setClientHeight(entry.contentRect.height);
      });

      resizeObserver.observe(containerElCopy);

      return () => {
        resizeObserver.unobserve(containerElCopy);
      };
    }, []);

    useEffect(() => {
      const observer = new MutationObserver(() => {
        const oldScrollHeight = scrollHeight;
        const newScrollHeight = scrollableEl.current.scrollHeight;

        // scrollableEl.current.scrollTo({
        //   top: scrollableEl.current.scrollHeight,
        //   behavior: "instant",
        // });

        setScrollHeight(scrollableEl.current.scrollHeight);
        setScrollWidth(scrollableEl.current.scrollWidth);
      });

      const config = {
        childList: true, // Observe direct children
        subtree: true, // Observe all descendants
        characterData: true, // Observe changes to text nodes
      };

      observer.observe(scrollableEl.current, config);

      return () => {
        observer.disconnect();
      };
    }, [scrollHeight]);

    const isScrolledToBottom = useMemo(() => {
      return scrollHeight - scrollTop <= clientHeight + 5;
    }, [scrollTop, scrollHeight, clientHeight]);

    const isScrolledToTop = useMemo(() => {
      return scrollTop === 0;
    }, [scrollTop]);

    const isScrolledToLeft = useMemo(() => {
      return scrollLeft === 0;
    }, [scrollLeft]);

    const isScrolledToRight = useMemo(() => {
      return scrollLeft >= scrollWidth - clientWidth;
    }, [scrollLeft, scrollWidth, clientWidth]);

    const subscribers = useRef<Array<(to: boolean) => void>>([]);

    useEffect(() => {
      subscribers.current.forEach((handler) => {
        handler(isScrolledToBottom);
      });
    }, [isScrolledToBottom]);

    useImperativeHandle(ref, () => ({
      scrollToBottom,
      isScrolledToBottom() {
        return Math.ceil(scrollableEl.current.scrollTop) >= scrollableEl.current.scrollHeight - scrollableEl.current.clientHeight;
      },
      subscribeToIsScrolledToBottomChanged(handler: (to: boolean) => void) {
        subscribers.current.push(handler);

        return () => {
          subscribers.current = subscribers.current.filter((_handler) => _handler !== handler);
        };
      },
    }));

    const showTopScrollHint = useMemo(() => {
      return false;
      return !isScrolledToTop;
    }, [isScrolledToTop]);

    const showBottomScrollHint = useMemo(() => {
      return false;
      return !isScrolledToBottom;
    }, [isScrolledToBottom]);

    const showLeftScrollHint = useMemo(() => {
      return false;
      return !isScrolledToLeft;
    }, [isScrolledToLeft]);

    const showRightScrollHint = useMemo(() => {
      return false;
      return !isScrolledToRight;
    }, [isScrolledToRight]);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
      const oldScrollTop = scrollTop;

      const newScrollTop = e.currentTarget.scrollTop;
      const newScrollLeft = e.currentTarget.scrollLeft;

      const isScrolledToTop = newScrollTop === 0;
      const isScrolledToBottom = scrollHeight - newScrollTop <= clientHeight;
      const temp = newScrollTop <= topThreshold && oldScrollTop > topThreshold;
      const isReachedBottomThreshold = newScrollTop > oldScrollTop && scrollHeight - (newScrollTop + clientHeight) <= bottomThreshold;

      if (isScrolledToTop) {
        onScrollToTop?.();
      }

      if (isScrolledToBottom) {
        onScrollToBottom?.();
      }

      if (isReachedBottomThreshold) {
        onReachBottomThreshold?.();
      }

      setScrollTop(newScrollTop);
      setScrollLeft(newScrollLeft);
    };

    const styles = useMemo<{ containerEl: CSSProperties; scrollableEl: CSSProperties }>(() => {
      if (height === "full") {
        return {
          containerEl: {
            height: "100%",
            overflow: "hidden",
            position: "relative",
          },
          scrollableEl: {
            position: "absolute",
            top: "0px",
            left: "0px",
            bottom: "0px",
            right: "0px",
            overflow: "auto",
          },
        };
      }

      if (height === "auto") {
        return {
          containerEl: {
            overflowX: "hidden",
            position: "relative",
          },
          scrollableEl: {
            overflowX: "scroll",
          },
        };
      }

      if (typeof height === "number") {
        return {
          containerEl: {
            height: height + "px",
            overflow: "hidden",
            position: "relative",
          },
          scrollableEl: {
            position: "absolute",
            top: "0px",
            left: "0px",
            bottom: "0px",
            right: "0px",
            overflow: "auto",
          },
        };
      }

      if (typeof height === "string" && height.startsWith("max-")) {
        const maxValue = height.split("-")[1];

        return {
          containerEl: {
            maxHeight: maxValue,
            position: "relative",
          },
          scrollableEl: {
            maxHeight: maxValue,
            overflowY: "scroll",
          },
        };
      }

      throw new Error("invalid value for prop 'height'");
    }, [height]);

    return (
      <div ref={containerEl} style={styles.containerEl}>
        {showTopScrollHint && <ScrollHint position="top" />}
        {showBottomScrollHint && <ScrollHint position="bottom" />}
        {showLeftScrollHint && <ScrollHint position="left" />}
        {showRightScrollHint && <ScrollHint position="right" />}

        {isLastScrollToBottom && !isScrolledToBottom && showScrollToBottomButton && (
          <div className="absolute bottom-[20px] right-[20px] z-[10]">
            <IconButton type="button" Icon={MdOutlineArrowDownward} size="lg" color="light" onClick={() => scrollToBottom()} />
          </div>
        )}

        <div ref={scrollableEl} style={styles.scrollableEl} onScroll={handleScroll}>
          {children}
        </div>
      </div>
    );
  },
);

export default Scroll;
