import { useEffect } from "react";

type Options = {
  onMouseDownMove: () => void;
};

let isMouseDown = false;

const useMouseDownMove = ({ onMouseDownMove }: Options) => {
  useEffect(() => {
    const mouseDownHandler = () => {
      isMouseDown = true;
    };

    const mouseUpHandler = () => {
      isMouseDown = true;
    };

    const mouseMoveHandler = () => {
      if (isMouseDown) {
        onMouseDownMove();
      }
    };

    document.addEventListener("mousedown", mouseDownHandler);
    document.addEventListener("mouseup", mouseUpHandler);
    document.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      document.removeEventListener("mousedown", mouseDownHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, []);
};

export default useMouseDownMove;
