import { cloneElement, CSSProperties, ReactNode, useEffect, useMemo, useState } from "react";
import { Portal } from "@/shared/ui";

type Item = {
  label: string;
  onClick?: () => void;
};

type Props = {
  items?: Item[];
  children: ReactNode;
  onShow?: () => void;
  onHide?: () => void;
};

const preventScroll = (event) => {
  event.preventDefault();
};

const preventArrowKeys = (event) => {
  if (["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown"].includes(event.key)) {
    event.preventDefault();
  }
};

const disableAllScrolling = () => {
  window.addEventListener("wheel", preventScroll, { passive: false });
  window.addEventListener("touchmove", preventScroll, { passive: false });
  window.addEventListener("keydown", preventArrowKeys, { passive: false });
  window.addEventListener("scroll", preventScroll, { passive: false });
};

const enableAllScrolling = () => {
  window.removeEventListener("wheel", preventScroll);
  window.removeEventListener("touchmove", preventScroll);
  window.removeEventListener("keydown", preventArrowKeys);
  window.removeEventListener("scroll", preventScroll);
};

let hasAtLeastOneContextMenuVisibleOnTheScreen = false;

const ContextMenu = ({ children, items, onHide, onShow }: Props) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handler = () => {
      if (showContextMenu && hasContextMenuItems) {
        setShowContextMenu(false);
        enableAllScrolling();
        hasAtLeastOneContextMenuVisibleOnTheScreen = false;
        onHide?.();
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [showContextMenu, onHide]);

  const contextMenuStyles = useMemo<CSSProperties>(() => {
    return {
      position: "fixed",
      top: position.y + "px",
      left: position.x + "px",
    };
  }, [position.x, position.y]);

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();

    if (!hasContextMenuItems) {
      return;
    }

    if (hasAtLeastOneContextMenuVisibleOnTheScreen) {
      return;
    }

    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
    setShowContextMenu(true);
    disableAllScrolling();
    hasAtLeastOneContextMenuVisibleOnTheScreen = true;
    onShow?.();
  };

  const hasContextMenuItems = items?.length > 0;

  return (
    <>
      {cloneElement(children, {
        onContextMenu: handleContextMenu,
      })}

      <Portal to={document.body}>
        {showContextMenu && hasContextMenuItems && (
          <div
            className="rounded-sm border border-gray-400 shadow-md bg-white z-1 min-w-[150px]"
            style={contextMenuStyles}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ul>
              {items!.map((item) => (
                <li
                  key={item.label}
                  className="p-1 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    item.onClick?.();
                    setShowContextMenu(false);
                    enableAllScrolling();
                    hasAtLeastOneContextMenuVisibleOnTheScreen = false;
                    onHide?.();
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Portal>
    </>
  );
};

export default ContextMenu;
