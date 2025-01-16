import { ComponentProps, forwardRef, ForwardedRef, useId, ReactElement } from "react";
import clsx from "clsx";

type Props = {
  label?: string;
  value?: ComponentProps<"input">["value"];
  onClick?: ComponentProps<"input">["onClick"];
  onChange?: ComponentProps<"input">["onChange"];
  onFocus?: ComponentProps<"input">["onFocus"];
  onBlur?: ComponentProps<"input">["onBlur"];
  onMouseEnter?: ComponentProps<"input">["onMouseEnter"];
  onMouseLeave?: ComponentProps<"input">["onMouseLeave"];
  placeholder?: ComponentProps<"input">["placeholder"];
  type?: ComponentProps<"input">["type"];
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  helperText?: string;
  Icon?: ReactElement;
  BeforeIcon?: ReactElement;
  AfterIcon?: ReactElement;
  className?: ComponentProps<"div">["className"];
};

const Input = forwardRef(
  (
    {
      label,
      helperText,
      value,
      onClick,
      onChange,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      placeholder,
      type,
      disabled = false,
      success = false,
      error = false,
      BeforeIcon,
      AfterIcon,
      className,
    }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const id = useId();

    const withBeforeIcon = Boolean(BeforeIcon);
    const withAfterIcon = Boolean(AfterIcon);

    const labelClasses = clsx("block mb-2 text-sm font-medium", {
      "text-gray-900": !success && !error,
      "text-green-700": success,
      "text-red-700": error,
    });

    const inputContainerClasses = clsx("text-sm rounded-lg flex items-center gap-x-2 px-2 w-full", {
      "bg-gray-50 border border-gray-300 text-gray-900 focus-within:ring-blue-500 focus-within:border-blue-500": !success && !error && !disabled,
      "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm focus-within:ring-green-500 focus-within:border-green-500":
        success && !disabled,
      "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus-within:ring-red-500 focus-within:border-red-500": error && !disabled,
      "bg-gray-100 border border-gray-300 text-gray-900 focus-within:ring-blue-500 focus-within:border-blue-500 cursor-not-allowed": disabled,
    });

    const inputClasses = clsx("flex-grow border-0 ring-0 outline-none bg-transparent py-2.5", {});

    const helperTextClasses = clsx("mt-2 text-sm", {
      "text-gray-500": !success && !error,
      "text-green-600": success,
      "text-red-600": error,
    });

    const beforeIconClasses = clsx("w-5 h-5 text-gray-500 pointer-events-none", {
      "text-gray-500": !success && !error,
      "text-red-600": error,
      "text-green-600": success,
    });

    const afterIconClasses = clsx("w-5 h-5 text-gray-500 pointer-events-none", {
      "text-gray-500": !success && !error,
      "text-red-600": error,
      "text-green-600": success,
    });

    return (
      <div className={clsx(className)}>
        {label && !disabled && (
          <label htmlFor={id} className={labelClasses}>
            {label}
          </label>
        )}

        <div className={inputContainerClasses} onClick={onClick} ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          {withBeforeIcon && <BeforeIcon className={beforeIconClasses} />}
          <input
            type={type}
            id={id}
            className={inputClasses}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            autoComplete="off"
            disabled={disabled}
          />
          {withAfterIcon && <AfterIcon className={afterIconClasses} />}
        </div>

        {helperText && !disabled && <p className={helperTextClasses}>{helperText}</p>}
      </div>
    );
  },
);

export default Input;
