import { useLayoutEffect, useRef, useState, EventHandler, MouseEvent, useEffect } from "react";
import { IconType } from "react-icons";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  StartIcon: IconType;
  EndIcon: IconType;
};

const Slider = ({ value, onChange, min, max, step, StartIcon, EndIcon }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [_, setCursorRelativePosition] = useState({
    x: 0,
    y: 0,
  });
  const [handleCoords, setHandleCoords] = useState({
    x: "0%",
  });

  const handleEl = useRef<HTMLDivElement>(null!);
  const dotEl = useRef<HTMLDivElement>(null!);
  const rootEl = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const mouseMoveHandler: EventHandler<any> = (e) => {
      let value = min + ((e.clientX - rootEl.current.getBoundingClientRect().x) / rootEl.current.getBoundingClientRect().width) * (max - min);

      const quotient = Math.round(value / step);

      value = quotient * step;

      if (value < min) {
        value = min;
      }

      if (value > max) {
        value = max;
      }

      onChange(value);
    };

    const mouseUpHandler: EventHandler<any> = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    }

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [isDragging]);

  useLayoutEffect(() => {
    const initHandleInitialPosition = () => {
      const x = ((value - min) / (max - min)) * 100 + "%";

      setHandleCoords((prev) => {
        return {
          ...prev,
          x,
        };
      });
    };

    initHandleInitialPosition();
  }, [value, min, max]);

  const handleMouseDown: EventHandler<MouseEvent> = (e) => {
    setIsDragging(true);

    setCursorRelativePosition({
      x: e.clientX - dotEl.current.getBoundingClientRect().x,
      y: e.clientY - dotEl.current.getBoundingClientRect().y,
    });
  };

  return (
    <div className="flex items-center gap-x-2">
      <StartIcon className="text-2xl" />
      <div ref={rootEl} className="bg-gray-300 h-2 w-full rounded-full relative">
        <div
          ref={handleEl}
          className="w-[0px] h-[0px] bg-black absolute top-1/2 z-10 -translate-y-1/2"
          style={{
            left: handleCoords.x,
          }}
          onMouseDown={handleMouseDown}
        >
          <span ref={dotEl} className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 z-10 shadow rounded-full cursor-pointer" />
        </div>

        <span className="bg-teal-500 h-2 absolute left-0 top-0 rounded-full" style={{ width: handleCoords.x }} />
      </div>
      <EndIcon className="text-2xl" />
    </div>
  );
};

export default Slider;
