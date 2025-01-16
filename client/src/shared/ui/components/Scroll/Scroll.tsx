import {
  CSSProperties,
  forwardRef,
  ReactNode,
  Ref,
  RefObject,
  UIEventHandler,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cls from "@/shared/lib/classnames";

type Props = {
  children: ReactNode;
  className?: string;
  onScrollToBottom?: () => void;
  onScrollToRight?: () => void;
  onScrollToTop?: () => void;
  onScrollToLeft?: () => void;
  height?: number | "full";
  scrollToBottomOnMount?: boolean;
  onReachTopThreshold?: () => void;
  topThreshold?: number;
};

export type ScrollHandle = {
  scrollToBottom: () => void;
  scrollableEl: HTMLElement;
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
      onScrollToLeft,
      scrollToBottomOnMount = false,
      onReachTopThreshold,
      topThreshold,
    },
    ref,
  ) => {
    const [scrollPosition, setScrollPosition] = useState({
      top: 0,
      left: 0,
    });
    const [scrollableElSize, setScrollableElSize] = useState({
      width: 0,
      height: 0,
    });

    const scrollableEl = useRef<HTMLElement>(null!);
    const containerEl = useRef<HTMLDivElement>(null!);

    useEffect(() => {
      const containerElCopy = containerEl.current;

      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];

        setScrollableElSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });

      resizeObserver.observe(containerElCopy);

      return () => {
        resizeObserver.unobserve(containerElCopy);
      };
    }, []);

    // useEffect(() => {
    //   const observer = new MutationObserver(() => {});
    //
    //   const config = {
    //     attributes: true, // Observe attribute changes
    //     childList: true, // Observe direct children
    //     subtree: true, // Observe all descendants
    //     characterData: true, // Observe changes to text nodes
    //   };
    //
    //   observer.observe(scrollableEl.current, config);
    //
    //   return () => {
    //     observer.disconnect();
    //   };
    // }, []);

    useImperativeHandle(ref, () => ({
      scrollToBottom() {
        scrollableEl.current.scrollTo({
          top: scrollableEl.current.scrollHeight,
          behavior: "instant",
        });
      },
      scrollableEl: scrollableEl.current,
    }));

    const showHasTopOverlay = useMemo(() => {
      return scrollPosition.top > 0;
    }, [scrollPosition.top]);

    const showHasBottomOverlay = useMemo(() => {
      if (!scrollableEl.current) {
        return false;
      }

      return scrollableEl.current.scrollHeight - scrollPosition.top !== scrollableEl.current.clientHeight;
    }, [scrollPosition.top]);

    const showLeftOverlay = useMemo(() => {
      return scrollPosition.left !== 0;
    }, [scrollPosition.left]);

    const showRightOverlay = useMemo(() => {
      if (!scrollableEl.current) {
        return false;
      }

      return scrollableEl.current.scrollWidth - scrollPosition.left !== scrollableEl.current.clientWidth;
    }, [scrollPosition.left]);

    useEffect(() => {
      if (scrollToBottomOnMount) {
        scrollableEl.current.scrollTo({
          top: scrollableEl.current.scrollHeight,
          behavior: "instant",
        });
      }
    }, [scrollToBottomOnMount]);

    // const isScrolledToBottom = useCallback(() => scrollableEl.current.scrollHeight - scrollableEl.current.scrollTop === scrollableEl.current.clientHeight, []);
    // const isScrolledToTop = useCallback(() => scrollableEl.current.scrollTop <= scrollThreshold, [scrollThreshold]);
    // const isScrolledToRight = useCallback(() => scrollableEl.current.scrollWidth - scrollableEl.current.scrollLeft === scrollableEl.current.clientWidth, []);
    // const isScrolledToLeft = useCallback(() => scrollableEl.current.scrollLeft === 0, []);

    const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
      const currentTop = scrollPosition.top;
      const newTop = e.currentTarget.scrollTop;

      if (onScrollToTop) {
        if (newTop === 0) {
          onScrollToTop();
        }
      }

      if (onReachTopThreshold && topThreshold) {
        if (newTop <= topThreshold && currentTop > topThreshold) {
          onReachTopThreshold();
        }
      }

      setScrollPosition({
        top: newTop,
        left: e.currentTarget.scrollLeft,
      });
    };

    const scrollableElStyles = useMemo<CSSProperties>(() => {
      return {
        width: scrollableElSize.width + "px",
        height: scrollableElSize.height + "px",
      };
      // const result: CSSProperties = {};
      //
      // if (typeof height === "number") {
      //   result.height = height + "px";
      // }
      //
      // if (height === "full") {
      //   result.height = "100%";
      // }
      //
      // return result;
    }, [scrollableElSize.width, scrollableElSize.height]);

    const rootElStyles = useMemo(() => {
      const result: CSSProperties = {};

      if (typeof height === "number") {
        result.height = height + "px";
      }

      if (height === "full") {
        result.height = "100%";
      }

      return result;
    }, [height]);

    return (
      <div ref={containerEl} className={cls("relative", className)}>
        {showHasTopOverlay && (
          <div className={cls(`absolute top-0 left-0 right-0 h-[${OVERLAY_SIZE}px] z-[2] bg-gradient-to-b from-white to-transparent pointer-events-none`)} />
        )}
        {showHasBottomOverlay && (
          <div className={cls(`absolute bottom-0 left-0 right-0 h-[${OVERLAY_SIZE}px] z-[2] bg-gradient-to-t from-white to-transparent pointer-events-none`)} />
        )}
        {showLeftOverlay && (
          <div className={cls(`absolute left-0 top-0 bottom-0 w-[${OVERLAY_SIZE}px] z-[2] bg-gradient-to-r from-white to-transparent pointer-events-none`)} />
        )}
        {showRightOverlay && (
          <div className={cls(`absolute right-0 top-0 bottom-0 w-[${OVERLAY_SIZE}px] z-[2] bg-gradient-to-l from-white to-transparent pointer-events-none`)} />
        )}

        <div
          ref={(el) => {
            scrollableEl.current = el!;
          }}
          className={cls("z-[1] overflow-scroll", className)}
          style={scrollableElStyles}
          onScroll={handleScroll}
        >
          {children}
        </div>
      </div>
    );
  },
);

export default Scroll;
