import { MutableRefObject, useEffect, Dispatch, SetStateAction, SyntheticEvent } from "react";

const DELAY = 500;

const useFloatingHoverTriggerListeners = ({
  referenceRef,
  floatingRef,
  updatedFn,
  enabled,
}: {
  referenceRef: MutableRefObject<HTMLElement>;
  floatingRef: MutableRefObject<HTMLElement>;
  updatedFn: Dispatch<SetStateAction<boolean>>;
  enabled: boolean;
}) => {
  useEffect(() => {
    const referenceEl = referenceRef.current;
    const floatingEl = floatingRef.current;
    let showTimeout: ReturnType<typeof setTimeout>;
    let hideTimeout: ReturnType<typeof setTimeout>;

    const mouseEnterHandler = () => {
      clearTimeout(hideTimeout);

      showTimeout = setTimeout(() => {
        updatedFn(true);
      }, DELAY);
    };

    const mouseLeaveHandler = () => {
      clearTimeout(showTimeout);

      hideTimeout = setTimeout(() => {
        updatedFn(false);
      }, DELAY);
    };

    const floatingElMouseEnterHandler = () => {
      clearTimeout(hideTimeout);
    };

    const floatingElMouseLeaveHandler = () => {
      hideTimeout = setTimeout(() => {
        updatedFn(false);
      }, DELAY);
    };

    const documentClickHandler = (e: SyntheticEvent) => {
      const clickedOutsideFloatingEl = !floatingRef.current.contains(e.target);

      if (clickedOutsideFloatingEl) {
        updatedFn(false);
      }
    };

    if (enabled) {
      referenceEl.addEventListener("mouseenter", mouseEnterHandler);
      referenceEl.addEventListener("mouseleave", mouseLeaveHandler);
      floatingEl.addEventListener("mouseenter", floatingElMouseEnterHandler);
      floatingEl.addEventListener("mouseleave", floatingElMouseLeaveHandler);
      document.addEventListener("click", documentClickHandler);
    }

    return () => {
      referenceEl.removeEventListener("mouseenter", mouseEnterHandler);
      referenceEl.removeEventListener("mouseleave", mouseLeaveHandler);
      floatingEl.removeEventListener("mouseenter", floatingElMouseEnterHandler);
      floatingEl.removeEventListener("mouseleave", floatingElMouseLeaveHandler);
      document.removeEventListener("click", documentClickHandler);
    };
  }, [enabled]);
};

export default useFloatingHoverTriggerListeners;
