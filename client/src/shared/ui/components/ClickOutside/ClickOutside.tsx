import { useEffect, cloneElement, ReactElement, useRef } from "react";

type Props = {
  children: ReactElement;
  handler: () => void;
};

const ClickOutside = ({ children, handler }: Props) => {
  const rootEl = useRef<HTMLElement>(null);

  useEffect(() => {
    const documentClickHandler = (e: Event) => {
      if (!rootEl.current!.contains(e.target)) {
        handler();
      }
    };

    setTimeout(() => {
      document.addEventListener("click", documentClickHandler);
    });

    return () => {
      document.removeEventListener("click", documentClickHandler);
    };
  }, []);

  return cloneElement(children, {
    ref: rootEl,
  });
};

export default ClickOutside;
