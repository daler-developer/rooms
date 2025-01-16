import { ReactElement, cloneElement, ComponentProps } from "react";
import clsx from "clsx";
import useFloating, { type OpenTrigger, type TooltipPlacement } from "../../hooks/useFloating.ts";
import Button from "../Button/Button.tsx";
import DropdownItem from "./DropdownItem.tsx";
import { Portal } from "@/shared/ui";

type DropdownCommonProps = {
  items: ComponentProps<typeof DropdownItem>[];
  placement: TooltipPlacement;
  openTrigger?: OpenTrigger;
  header?: {
    title: string;
    subTitle: string;
  };
  isActive?: boolean;
};

type DropdownWithCustomTriggerProps = DropdownCommonProps & {
  trigger: ReactElement;
};

type DropdownWithDefaultTriggerProps = DropdownCommonProps & {
  label: string;
};

type Props = DropdownWithCustomTriggerProps | DropdownWithDefaultTriggerProps;

const Dropdown = ({ label, items, header, trigger, openTrigger = "click", placement = "top-right", isActive = true }: Props) => {
  const { referenceRef, floatingRef, floatingStyles, close } = useFloating({
    placement,
    width: 200,
    offset: 4,
    openTrigger,
    isActive,
  });

  const dropdownMenuClasses = clsx(
    "z-10 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow w-44 dark:bg-gray-700 dark:divide-gray-600",
  );

  const withHeader = Boolean(header);
  const withCustomTrigger = Boolean(trigger);

  const renderTrigger = () => {
    if (withCustomTrigger) {
      return cloneElement(trigger!, {
        ref: referenceRef,
      });
    }

    return (
      <Button type="button" color="default" ref={referenceRef}>
        {label}
      </Button>
    );
  };

  return (
    <>
      {renderTrigger()}

      <Portal>
        <div ref={floatingRef} style={floatingStyles} className={dropdownMenuClasses}>
          {withHeader && (
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>{header!.title}</div>
              <div className="font-medium truncate">{header!.subTitle}</div>
            </div>
          )}

          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {items.map((item, i) => (
              <li key={i} onClick={() => close()}>
                <DropdownItem {...item} />
              </li>
            ))}
          </ul>
        </div>
      </Portal>
    </>
  );
};

export default Dropdown;
