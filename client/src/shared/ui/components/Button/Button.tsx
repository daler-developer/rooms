import { ComponentProps, ForwardedRef, forwardRef, ReactNode } from "react";
import { IconType } from "react-icons";
import Spinner from "../Spinner/Spinner.tsx";
import cn from "@/shared/lib/classnames";

type ButtonColor = "default" | "red" | "light";

type ButtonVariant = "outlined" | "filled";

type ButtonSize = "sm" | "md" | "lg";

type Props = {
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: ReactNode;
  disabled?: ComponentProps<"button">["disabled"];
  type: ComponentProps<"button">["type"];
  onClick?: ComponentProps<"button">["onClick"];
  Icon?: IconType;
  className?: string;
  form?: ComponentProps<"button">["form"];
  fullWidth?: boolean;
};

const Button = forwardRef(
  (
    { className, form, onClick, type, color = "default", size = "md", disabled = false, children, isLoading = false, Icon, fullWidth = false }: Props,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const buttonClasses = cn("flex items-center justify-center gap-2 relative overflow-hidden focus:ring-4 font-medium rounded-lg text-sm focus:outline-none", {
      "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 text-white": color === "default" && !disabled,
      "bg-red-700 hover:bg-red-800 focus:ring-red-300 text-white": color === "red" && !disabled,
      "bg-white border border-gray-300 text-gray-900": color === "light",
      "cursor-not-allowed": disabled,
      "bg-blue-400 text-white": disabled && color === "default",
      "bg-red-400 text-white": disabled && color === "red",
      "opacity-[0.5]": disabled && color === "light",
      "px-3 py-2": size === "sm",
      "px-5 py-2.5": size === "md",
      "px-5 py-3": size === "lg",
      "w-full block": fullWidth,
      className,
    });

    const loaderOverlayClasses = cn("absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-white rounded-lg border border-gray-200");

    return (
      <button type={type} className={buttonClasses} disabled={disabled || isLoading} ref={ref} onClick={onClick} form={form}>
        {children}
        {Icon && <Icon />}

        {isLoading && (
          <div className={loaderOverlayClasses}>
            <Spinner size="sm" />
          </div>
        )}
      </button>
    );
  },
);

export default Button;
