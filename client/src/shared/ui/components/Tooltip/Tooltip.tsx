import { ReactElement, cloneElement, useRef, useState, useEffect, useLayoutEffect } from "react";
import clsx from "clsx";
import useFloating, { TooltipPlacement } from "../../hooks/useFloating.ts";

type Props = {
  children: ReactElement;
  placement?: TooltipPlacement;
  text?: string;
};

const Tooltip = ({ children, text, placement = "top" }: Props) => {
  const { floatingStyles, referenceRef, floatingRef } = useFloating({ placement, offset: 10, fullWidth: false, openTrigger: "hover" });

  const tooltipClasses = clsx("z-10 px-3 py-2 text-sm font-medium rounded-lg shadow-xl bg-white");

  return (
    <>
      {cloneElement(children, {
        ref: referenceRef,
      })}

      <div ref={floatingRef} style={floatingStyles} className="max-w-[200px]">
        <div className={tooltipClasses}>{text}</div>
      </div>
    </>
  );
};

export default Tooltip;
