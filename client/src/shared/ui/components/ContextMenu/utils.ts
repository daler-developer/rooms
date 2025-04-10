import { ContextMenuPlacement } from "./types.ts";

const preventScroll = (event) => {
  event.preventDefault();
};

const preventArrowKeys = (event) => {
  if (["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown"].includes(event.key)) {
    event.preventDefault();
  }
};

export const disableAllScrolling = () => {
  window.addEventListener("wheel", preventScroll, { passive: false });
  window.addEventListener("touchmove", preventScroll, { passive: false });
  window.addEventListener("keydown", preventArrowKeys, { passive: false });
  window.addEventListener("scroll", preventScroll, { passive: false });
};

export const enableAllScrolling = () => {
  window.removeEventListener("wheel", preventScroll);
  window.removeEventListener("touchmove", preventScroll);
  window.removeEventListener("keydown", preventArrowKeys);
  window.removeEventListener("scroll", preventScroll);
};

export const calcPosition = (clientX: number, clientY: number, width: number, height: number, placement: ContextMenuPlacement) => {
  switch (placement) {
    case "bottom-left":
      return [clientX - width, clientY];
    case "bottom-right":
      return [clientX, clientY];
    case "top-left":
      return [clientX - width, clientY - height];
    case "top-right":
      return [clientX, clientY - height];
    default:
      throw new Error();
  }
};

export const checkIfIsViewport = (width: number, height: number, x: number, y: number) => {
  if (y < 0) {
    return false;
  }
  if (x < 0) {
    return false;
  }
  if (x + width > window.innerWidth) {
    return false;
  }
  if (y + height > window.innerHeight) {
    return false;
  }
  return true;
};
