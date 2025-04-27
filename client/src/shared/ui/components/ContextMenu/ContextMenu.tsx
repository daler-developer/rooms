import { cloneElement, CSSProperties, forwardRef, ReactElement, ReactNode, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Portal } from "@/shared/ui";
import { type ContextMenuPlacement } from "./types.ts";
import { disableAllScrolling, enableAllScrolling, calcPosition, checkIfIsViewport } from "./utils.ts";

type Item = {
  label: string;
  onClick?: () => void;
};

export type ContextMenuItems = Item[];

type Props = {
  items?: ContextMenuItems;
  children: ReactElement;
  onShow?: () => void;
  onHide?: () => void;
  content: ReactNode;
  placement?: ContextMenuPlacement;
  placementFallback?: ContextMenuPlacement;
  enabled?: boolean;
};

export type ExposedState = {
  isOpen: boolean;
};

type Subscriber = (state: ExposedState) => void;

export type ContextMenuHandle = {
  close: () => void;
  subscribeToStateUpdateChange: (callback: Subscriber) => () => void;
};

let hasAtLeastOneContextMenuVisibleOnTheScreen = false;

const ContextMenu = forwardRef<ContextMenuHandle, Props>(
  ({ children, onHide, onShow, content, placement = "bottom-left", placementFallback, enabled = true }, ref) => {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [position, setPosition] = useState({
      x: 0,
      y: 0,
    });

    const rootEl = useRef<HTMLDivElement>(null!);

    const subscribers = useRef<Subscriber[]>([]);

    useEffect(() => {
      subscribers.current.forEach((callback) => {
        callback({ isOpen: showContextMenu });
      });
    }, [showContextMenu]);

    useImperativeHandle(ref, () => ({
      close() {
        setShowContextMenu(false);
        enableAllScrolling();
        hasAtLeastOneContextMenuVisibleOnTheScreen = false;
        onHide?.();
      },
      subscribeToStateUpdateChange(callback) {
        subscribers.current.push(callback);

        return () => {
          subscribers.current = subscribers.current.filter((_handler) => _handler !== callback);
        };
      },
    }));

    useEffect(() => {
      const handler = () => {
        if (showContextMenu) {
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
      const styles: CSSProperties = {
        position: "fixed",
        top: position.y + "px",
        left: position.x + "px",
      };

      if (!showContextMenu) {
        styles.visibility = "hidden";
      }

      return styles;
    }, [showContextMenu, position.x, position.y]);

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();

      if (hasAtLeastOneContextMenuVisibleOnTheScreen) {
        return;
      }

      if (!enabled) {
        return;
      }

      let [x, y] = calcPosition(e.clientX, e.clientY, rootEl.current.getBoundingClientRect().width, rootEl.current.getBoundingClientRect().height, placement);

      const isInViewport = checkIfIsViewport(rootEl.current.getBoundingClientRect().width, rootEl.current.getBoundingClientRect().height, x, y);

      if (!isInViewport && placementFallback) {
        [x, y] = calcPosition(
          e.clientX,
          e.clientY,
          rootEl.current.getBoundingClientRect().width,
          rootEl.current.getBoundingClientRect().height,
          placementFallback,
        );
      }

      setPosition({
        x,
        y,
      });
      setShowContextMenu(true);
      disableAllScrolling();
      hasAtLeastOneContextMenuVisibleOnTheScreen = true;
      onShow?.();
    };

    return (
      <>
        {cloneElement(children, {
          onContextMenu: handleContextMenu,
        })}

        <Portal to={document.body}>
          <div
            ref={rootEl}
            className="z-1 min-w-[150px]"
            style={contextMenuStyles}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {content}
          </div>
        </Portal>
      </>
    );
  },
);

export default ContextMenu;
