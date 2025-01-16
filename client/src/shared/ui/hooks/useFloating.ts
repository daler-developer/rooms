import { flushSync } from "react-dom";
import { CSSProperties, MutableRefObject, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import useFloatingClickTriggerListener from "./useFloatingClickTriggerListener.ts";
import useFloatingHoverTriggerListeners from "@/shared/ui/hooks/useFloatingHoverTriggerListeners.ts";
import { useIsFirstRender } from "@/shared/hooks";
import useFloatingContextmenuTriggerListener from "@/shared/ui/hooks/useFloatingContextmenuTriggerListener.ts";

export type TooltipPlacement = "top" | "top-right" | "bottom" | "bottom-left" | "bottom-right" | "left" | "right";

export type OpenTrigger = "hover" | "click" | "contextmenu";

export type Width = number | "full";

type Props = {
  placement: TooltipPlacement;
  fullWidth?: boolean;
  offset?: number;
  openTrigger?: OpenTrigger;
  onVisibilityChange?: (isVisible: boolean) => void;
  width?: Width;
  isActive?: boolean;
};

type FloatingStyles = {
  visibility: CSSProperties["visibility"];
  position: CSSProperties["position"];
  left: CSSProperties["left"];
  top: CSSProperties["top"];
  width?: CSSProperties["width"];
  zIndex: CSSProperties["zIndex"];
};

const useFloating = ({ placement, width, offset = 0, openTrigger = "click", onVisibilityChange, isActive = true }: Props) => {
  const [showFloatingEl, setShowFloatingEl] = useState(false);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [floatingElWidth, setFloatingElWidth] = useState<number | null>(null);

  const isFirstRender = useIsFirstRender();

  const referenceRef: MutableRefObject<HTMLElement> = useRef(null!);
  const floatingRef: MutableRefObject<HTMLElement> = useRef(null!);

  useEffect(() => {
    if (isFirstRender) {
      return;
    }

    onVisibilityChange?.(showFloatingEl);
  }, [showFloatingEl]);

  useLayoutEffect(() => {
    if (typeof width === "number") {
      setFloatingElWidth(width);
    }

    if (typeof width === "undefined") {
      setFloatingElWidth(null);
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: referenceElWidth } = entry.contentRect;

        if (width === "full") {
          setFloatingElWidth(referenceElWidth);
        }
      }
    });

    resizeObserver.observe(referenceRef.current);

    return () => {
      resizeObserver.unobserve(referenceRef.current);
    };
  }, [width]);

  const floatingStyles = useMemo<FloatingStyles>(() => {
    const result: FloatingStyles = {
      visibility: showFloatingEl && isActive ? "visible" : "hidden",
      position: "fixed",
      left: positionX + "px",
      top: positionY + "px",
      zIndex: 1000,
    };

    if (floatingElWidth !== null) {
      result.width = floatingElWidth + "px";
    }

    return result;
  }, [showFloatingEl, positionX, positionY, floatingElWidth]);

  useEffect(() => {
    const floatingEl = floatingRef.current;
    const referenceEl = referenceRef.current;

    const calculatePositionX = () => {
      switch (placement) {
        case "bottom-left":
          return referenceEl.getBoundingClientRect().left;
        case "bottom-right":
        case "top-right":
          return referenceEl.getBoundingClientRect().right - floatingEl.getBoundingClientRect().width;
        case "top":
        case "bottom":
          return referenceEl.getBoundingClientRect().left + floatingEl.getBoundingClientRect().width / 2 - floatingEl.getBoundingClientRect().width / 2;
        case "left":
          return referenceEl.getBoundingClientRect().left - floatingEl.getBoundingClientRect().width - offset;
        case "right":
          return referenceEl.getBoundingClientRect().right + offset;
      }
    };

    const calculatePositionY = () => {
      switch (placement) {
        case "top":
        case "top-right":
          return referenceEl.getBoundingClientRect().top - floatingEl.getBoundingClientRect().height - offset;
        case "bottom":
        case "bottom-left":
        case "bottom-right":
          return referenceEl.getBoundingClientRect().bottom + offset;
        case "left":
        case "right":
          return referenceEl.getBoundingClientRect().top + referenceEl.getBoundingClientRect().height / 2 - floatingEl.getBoundingClientRect().height / 2;
      }
    };

    const updatePosition = () => {
      const x = calculatePositionX();
      const y = calculatePositionY();

      flushSync(() => {
        setPositionX(x);
        setPositionY(y);
      });
    };

    let observer: IntersectionObserver | null = null;

    const init = () => {
      const rootMargin = [
        Math.floor(referenceEl.getBoundingClientRect().top) - 2, // top
        Math.floor(window.innerWidth - referenceEl.getBoundingClientRect().right) - 2, // right
        Math.floor(window.innerHeight - referenceEl.getBoundingClientRect().bottom) - 2, // bottom
        Math.floor(referenceEl.getBoundingClientRect().left) - 2, // left
      ]
        .map((value) => `${-Math.floor(value)}px`)
        .join(" ");

      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (entry.intersectionRatio === 1) {
            return;
          }

          if (!entry.isIntersecting) {
            updatePosition();
            observer!.disconnect();
            init();
          }
        },
        {
          root: null,
          rootMargin,
          threshold: 1,
        },
      );

      observer.observe(referenceEl);
    };

    init();

    const scrollHandler = () => {
      updatePosition();
    };

    const parents: EventTarget[] = [window];

    let parent = referenceEl.parentElement;

    while (parent) {
      parents.push(parent);
      parent = parent.parentElement;
    }

    parents.forEach((parent) => {
      parent.addEventListener("scroll", scrollHandler, { passive: true });
    });

    const referenceElResizeObserver = new ResizeObserver(() => {
      updatePosition();
    });

    // floatingElResizeObserver.observe(floatingRef.current);
    referenceElResizeObserver.observe(referenceRef.current);

    return () => {
      referenceElResizeObserver.unobserve(referenceEl);
      parents.forEach((parent) => {
        parent.removeEventListener("scroll", scrollHandler);
      });
      // floatingElResizeObserver.unobserve(floatingEl);

      observer?.disconnect();
    };
  }, [offset, placement]);

  useFloatingClickTriggerListener({ referenceRef, floatingRef, updatedFn: setShowFloatingEl, enabled: openTrigger === "click" });
  useFloatingHoverTriggerListeners({ referenceRef, floatingRef, updatedFn: setShowFloatingEl, enabled: openTrigger === "hover" });
  useFloatingContextmenuTriggerListener({ referenceRef, floatingRef, updatedFn: setShowFloatingEl, enabled: openTrigger === "contextmenu" });

  const handleManualClose = () => {
    setShowFloatingEl(false);
  };

  return {
    referenceRef,
    floatingRef,
    floatingStyles,
    close: handleManualClose,
  };
};

export default useFloating;
