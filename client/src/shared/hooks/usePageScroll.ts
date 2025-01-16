import { useEffect } from "react";

type UsePageScrollOptions = {
  onEnd?: () => void;
};

const usePageScroll = ({ onEnd }: UsePageScrollOptions = {}) => {
  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight) {
        onEnd?.();
      }
    };

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, [onEnd]);
};

export default usePageScroll;
