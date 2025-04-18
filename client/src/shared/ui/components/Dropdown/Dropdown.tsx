import { ReactElement, cloneElement, ComponentProps } from "react";
import clsx from "clsx";
import useFloating, { type OpenTrigger, type TooltipPlacement } from "../../hooks/useFloating.ts";
import Button from "../Button/Button.tsx";
import ListGroup from "../ListGroup/ListGroup.tsx";
import DropdownItem from "./DropdownItem.tsx";
import { Portal } from "@/shared/ui";

type DropdownCommonProps = {
  items: ComponentProps<typeof DropdownItem>[];
  placement: TooltipPlacement;
  openTrigger?: OpenTrigger;
  isActive?: boolean;
};

type DropdownWithCustomTriggerProps = DropdownCommonProps & {
  trigger: ReactElement;
};

type DropdownWithDefaultTriggerProps = DropdownCommonProps & {
  label: string;
};

type Props = DropdownWithCustomTriggerProps | DropdownWithDefaultTriggerProps;

const Dropdown = ({ label, items, trigger, openTrigger = "click", placement = "top-right", isActive = true }: Props) => {
  const { referenceRef, floatingRef, floatingStyles, close } = useFloating({
    placement,
    width: 200,
    offset: 4,
    openTrigger,
    isActive,
  });

  const withCustomTrigger = Boolean(trigger);

  const renderTrigger = () => {
    if (withCustomTrigger) {
      return cloneElement(trigger!, {
        ref: referenceRef,
      });
    }
    // divide-y divide-gray-100 rounded-md shadow w-44 dark:bg-gray-700 dark:divide-gray-600 border border-gray-200
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
        <div ref={floatingRef} style={floatingStyles} className={clsx("z-10 shadow-lg rounded-lg")}>
          <ListGroup>
            {items.map((item, i) => (
              <ListGroup.Item
                key={i}
                onClick={() => {
                  close();
                  item.onClick?.();
                }}
                Icon={item.Icon}
              >
                {item.label}
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/*<ul className="py-2 text-sm text-gray-700 dark:text-gray-200">*/}
          {/*  {items.map((item, i) => (*/}
          {/*    <li key={i} onClick={() => close()}>*/}
          {/*      <DropdownItem {...item} />*/}
          {/*    </li>*/}
          {/*  ))}*/}
          {/*</ul>*/}
        </div>
      </Portal>
    </>
  );
};

export default Dropdown;
