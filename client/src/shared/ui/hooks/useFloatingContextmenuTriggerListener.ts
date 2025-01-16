import { MutableRefObject, useEffect, Dispatch, SetStateAction } from "react";

const useFloatingContextmenuTriggerListener = ({
  floatingRef,
  referenceRef,
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

    const documentHandler = (e: Event) => {
      const clickedOutsideReferenceEl = !referenceEl.contains(e.target);
      const clickedOutsideFloatingEl = !floatingEl.contains(e.target);

      if (clickedOutsideReferenceEl && clickedOutsideFloatingEl) {
        updatedFn(false);
      }
    };

    const referenceElHandler = (e: MouseEvent) => {
      e.preventDefault();
      updatedFn((prev) => !prev);
    };

    if (enabled) {
      referenceEl.addEventListener("contextmenu", referenceElHandler);
      document.addEventListener("click", documentHandler, { capture: true });
    }

    return () => {
      referenceEl.removeEventListener("contextmenu", referenceElHandler);
      document.removeEventListener("click", documentHandler);
    };
  }, [enabled]);
};

export default useFloatingContextmenuTriggerListener;
