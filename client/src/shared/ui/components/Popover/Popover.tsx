import { ReactElement, cloneElement, ReactNode } from "react";
import cls from "@/shared/lib/classnames";
import useFloating, { TooltipPlacement, OpenTrigger, Width } from "../../hooks/useFloating.ts";

type Props = {
  trigger: ReactNode;
  children: ReactElement;
  placement?: TooltipPlacement;
  onOpen?: () => void;
  width?: Width;
  offset?: number;
  openTrigger?: OpenTrigger;
};

const Popover = ({ trigger, children, onOpen, width = "full", placement = "bottom-left", offset = 10, openTrigger = "click" }: Props) => {
  const { referenceRef, floatingRef, floatingStyles } = useFloating({
    placement,
    offset,
    width,
    openTrigger,
    onVisibilityChange(isVisible) {
      if (isVisible) {
        onOpen?.();
      }
    },
  });

  // const popoverClasses = cls(children.props.className);

  return (
    <>
      {cloneElement(trigger, { ref: referenceRef })}

      <div ref={floatingRef} style={floatingStyles}>
        {children}
      </div>
    </>
  );
};

export default Popover;
