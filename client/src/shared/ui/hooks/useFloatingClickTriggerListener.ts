import { MutableRefObject, SyntheticEvent, useEffect, Dispatch, SetStateAction } from "react";

const useFloatingClickTriggerListener = ({
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

    const documentHandler = (e: SyntheticEvent) => {
      const clickedOutsideReferenceEl = !referenceEl.contains(e.target);
      const clickedOutsideFloatingEl = !floatingEl.contains(e.target);

      if (clickedOutsideReferenceEl && clickedOutsideFloatingEl) {
        updatedFn(false);
      }
    };

    const referenceElHandler = () => {
      updatedFn(true);
    };

    if (enabled) {
      document.addEventListener("click", documentHandler, { capture: true });
      referenceEl.addEventListener("click", referenceElHandler);
    }

    return () => {
      referenceEl.removeEventListener("click", referenceElHandler);
      document.removeEventListener("click", documentHandler);
    };
  }, [enabled]);
};

export default useFloatingClickTriggerListener;
