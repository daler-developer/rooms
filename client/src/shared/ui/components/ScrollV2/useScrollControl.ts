import Scroll from "./Scroll";
import { ElementRef, useCallback, useRef, useState } from "react";

const useScrollControl = () => {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const ref = useRef<ElementRef<typeof Scroll>>(null!);

  const scrollToBottom = useCallback(() => {
    ref.current.scrollToBottom();
  }, []);

  const refCallback = useCallback((el: any | null) => {
    ref.current = el;

    let unsubscribe: () => void = null;

    if (el) {
      unsubscribe = ref.current.subscribeToIsScrolledToBottomChanged((to) => {
        setIsScrolledToBottom(to);
      });
    } else {
      unsubscribe?.();
    }
  }, []);

  return {
    ref: refCallback,
    isScrolledToBottom,
    scrollToBottom,
  };
};

export default useScrollControl;
