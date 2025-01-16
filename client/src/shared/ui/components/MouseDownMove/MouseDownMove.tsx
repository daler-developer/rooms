import { cloneElement, forwardRef, ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
  onMouseDownMove?: () => void;
  onContextMenu?: (event: MouseEvent) => void;
};

let isMouseDown = false;

const MouseDownMove = forwardRef(({ children, onMouseDownMove, onContextMenu }: Props, ref) => {
  useEffect(() => {
    const mouseDownHandler = () => {
      isMouseDown = true;
    };

    const mouseUpHandler = () => {
      isMouseDown = false;
    };

    document.addEventListener("mousedown", mouseDownHandler);
    document.addEventListener("mouseup", mouseUpHandler);

    return () => {
      document.removeEventListener("mousedown", mouseDownHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, []);

  const mouseMoveHandler = () => {
    if (isMouseDown) {
      onMouseDownMove?.();
    }
  };

  return (
    <>
      {cloneElement(children, {
        ref,
        onMouseMove: mouseMoveHandler,
        onContextMenu: onContextMenu,
      })}
    </>
  );
});

export default MouseDownMove;
