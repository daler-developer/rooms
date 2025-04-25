import { useRef, useEffect } from "react";

const TOLERANCE = 0;

const usePreciseClick = (onPreciseClick: () => void) => {
  const elementRef = useRef<HTMLElement>(null);
  const downCoords = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      downCoords.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = (event: MouseEvent) => {
      const { x, y } = downCoords.current;
      if (x !== null && y !== null && Math.abs(x - event.clientX) <= TOLERANCE && Math.abs(y - event.clientY) <= TOLERANCE) {
        onPreciseClick();
      }
    };

    const element = elementRef.current;
    if (element) {
      element.addEventListener("mousedown", handleMouseDown, { capture: true });
      element.addEventListener("mouseup", handleMouseUp, { capture: true });
    }

    return () => {
      if (element) {
        element.removeEventListener("mousedown", handleMouseDown);
        element.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [onPreciseClick]);

  return elementRef;
};

export default usePreciseClick;
