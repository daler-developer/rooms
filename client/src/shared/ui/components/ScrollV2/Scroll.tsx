import { CSSProperties, forwardRef, ReactNode, UIEvent, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import cls from "@/shared/lib/classnames";
import { usePrevValue } from "@/shared/hooks";
import { MdOutlineArrowDownward } from "react-icons/md";
import { IconButton } from "@/shared/ui";

type Props = {
  children: ReactNode;
  className?: string;
  onScrollToBottom?: () => void;
  onScrollToRight?: () => void;
  onScrollToTop?: () => void;
  onScrollToTopWithThreshold?: () => void;
  onScrollToLeft?: () => void;
  height?: number | "full";
  scrollToBottomOnMount?: boolean;
  onReachTopThreshold?: () => void;
  topThreshold?: number;
  showScrollToBottomButton?: boolean;
};

export type ScrollHandle = {
  scrollToBottom: () => void;
  isScrolledToBottom: () => boolean;
  subscribeToIsScrolledToBottomChanged: (handler: (to: boolean) => void) => () => void;
};

const OVERLAY_SIZE = 20;

const Scroll = forwardRef<ScrollHandle, Props>(
  (
    {
      children,
      height,
      className,
      onScrollToBottom,
      onScrollToRight,
      onScrollToTop,
      onScrollToTopWithThreshold,
      onScrollToLeft,
      scrollToBottomOnMount = false,
      onReachTopThreshold,
      topThreshold = 100,
      showScrollToBottomButton = true,
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
      return Math.ceil(scrollTop) >= scrollHeight - clientHeight;
    }, [scrollTop, scrollHeight, clientHeight]);

    const isScrolledToTop = useMemo(() => {
      return scrollTop === 0;
    }, [scrollTop]);

    const isScrolledToLeft = useMemo(() => {
      return scrollLeft === 0;
    }, [scrollLeft]);

    const isScrolledToRight = useMemo(() => {
      return scrollWidth - scrollLeft !== clientWidth;
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

    const showTopOverlay = useMemo(() => {
      return !isScrolledToTop;
    }, [isScrolledToTop]);

    const showBottomOverlay = useMemo(() => {
      return !isScrolledToBottom;
    }, [isScrolledToBottom]);

    const showLeftOverlay = useMemo(() => {
      return !isScrolledToLeft;
    }, [isScrolledToLeft]);

    const showRightOverlay = useMemo(() => {
      return !isScrolledToRight;
    }, [isScrolledToRight]);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
      const oldScrollTop = scrollTop;

      const newScrollTop = e.currentTarget.scrollTop;
      const newScrollLeft = e.currentTarget.scrollLeft;

      const isScrolledToTop = newScrollTop === 0;
      const isScrolledToTopWithThreshold = newScrollTop <= topThreshold && oldScrollTop > topThreshold;

      if (isScrolledToTop) {
        onScrollToTop?.();
      }

      if (isScrolledToTopWithThreshold) {
        onScrollToTopWithThreshold?.();
      }

      setScrollTop(newScrollTop);
      setScrollLeft(newScrollLeft);
    };

    const rootElStyles = useMemo(() => {
      const result: CSSProperties = {};

      if (height === "full") {
        result.height = "100%";
      }

      if (typeof height === "number") {
        result.height = height + "px";
      }

      return result;
    }, [height]);

    return (
      <div ref={containerEl} style={rootElStyles} className={cls("relative")}>
        {/*{showTopOverlay && (*/}
        {/*  <div className={cls(`absolute top-0 left-0 right-0 h-[${OVERLAY_SIZE}px] z-[2] bg-gradient-to-b from-white to-transparent pointer-events-none`)} />*/}
        {/*)}*/}
        {/*{showBottomOverlay && (*/}
        {/*  <div className={cls(`absolute bottom-0 left-0 right-0 h-[${OVERLAY_SIZE}px] z-[2] bg-gradient-to-t from-white to-transparent pointer-events-none`)} />*/}
        {/*)}*/}
        {/*{showLeftOverlay && (*/}
        {/*  <div className={cls(`absolute left-0 top-0 bottom-0 w-[${OVERLAY_SIZE}px] z-[2] bg-gradient-to-r from-white to-transparent pointer-events-none`)} />*/}
        {/*)}*/}
        {/*{showRightOverlay && (*/}
        {/*  <div className={cls(`absolute right-0 top-0 bottom-0 w-[${OVERLAY_SIZE}px] z-[2] bg-gradient-to-l from-white to-transparent pointer-events-none`)} />*/}
        {/*)}*/}

        {isLastScrollToBottom && !isScrolledToBottom && showScrollToBottomButton && (
          <div className="absolute bottom-[20px] right-[20px] z-[10]">
            <IconButton type="button" Icon={MdOutlineArrowDownward} size="lg" color="light" onClick={() => scrollToBottom()} />
          </div>
        )}

        <div ref={scrollableEl} className={cls("absolute top-0 left-0 bottom-0 right-0 overflow-scroll")} onScroll={handleScroll}>
          {children}
        </div>
      </div>
    );
  },
);

export default Scroll;
