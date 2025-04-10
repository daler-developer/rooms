import { useRef, useEffect, ElementRef, useState } from "react";
import ContextMenu, { type ExposedState } from "./ContextMenu";

const useContextMenuControl = () => {
  const [state, setState] = useState<ExposedState>({ isOpen: false });
  const contextMenu = useRef<ElementRef<typeof ContextMenu>>(null);

  useEffect(() => {
    if (!contextMenu.current) {
      return;
    }

    const unsubscribe = contextMenu.current.subscribeToStateUpdateChange((_state) => {
      setState(_state);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    ref: contextMenu,
    state,
    close() {
      contextMenu.current?.close();
    },
  };
};

export default useContextMenuControl;
