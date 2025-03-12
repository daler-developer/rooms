import { ComponentProps, forwardRef } from "react";
import { IconType } from "react-icons";
import clsx from "clsx";
import Spinner from "../Spinner/Spinner.tsx";
import { Badge } from "@/shared/ui";

type Props = {
  size?: "sm" | "md" | "lg";
  color?: "default" | "red" | "light";
  loading?: boolean;
  disabled?: ComponentProps<"button">["disabled"];
  type: ComponentProps<"button">["type"];
  onClick?: ComponentProps<"button">["onClick"];
  Icon: IconType;
  isLoading?: boolean;
  onContextMenu?: ComponentProps<"button">["onContextMenu"];
  withBadge?: boolean;
  badgeContent?: ComponentProps<typeof Badge>["badgeContent"];
  badgeColor?: ComponentProps<typeof Badge>["badgeColor"];
};

const IconButton = forwardRef<HTMLButtonElement, Props>(
  (
    {
      type,
      onClick,
      Icon,
      withBadge = false,
      size = "md",
      color = "default",
      disabled = false,
      isLoading = false,
      onContextMenu,
      badgeContent,
      badgeColor = "blue",
    },
    ref,
  ) => {
    const buttonClasses = clsx("relative focus:ring-4 focus:outline-none font-medium p-2.5 rounded-full inline-flex items-center justify-center", {
      "text-white bg-blue-600 hover:bg-blue-800 focus:ring-blue-300": color === "default",
      "bg-red-700 hover:bg-red-800 focus:ring-red-300 text-white": color === "red",
      "bg-white border border-gray-300 text-gray-900": color === "light",
      "w-[35px] h-[35px]": size === "sm",
      "w-[40px] h-[40px]": size === "md",
      "w-[45px] h-[45px]": size === "lg",
      "opacity-[0.7]": disabled,
    });

    const iconClasses = clsx({
      "text-md": size === "sm",
      "text-lg": size === "md",
      "text-xl": size === "lg",
    });

    const loaderOverlayClasses = clsx("absolute top-0 left-0 bottom-0 right-0 bg-white flex items-center justify-center rounded-full");

    return (
      <button type={type} disabled={disabled || isLoading} onClick={onClick} className={buttonClasses} onContextMenu={onContextMenu} ref={ref}>
        {isLoading && (
          <div className={loaderOverlayClasses}>
            <Spinner size="sm" />
          </div>
        )}
        <Icon className={iconClasses} />
        {withBadge && <Badge className="absolute top-[-5px] right-[-5px]" badgeContent={badgeContent} badgeColor={badgeColor} />}
      </button>
    );
  },
);

export default IconButton;
