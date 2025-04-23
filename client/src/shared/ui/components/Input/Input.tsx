import { ComponentProps, forwardRef, useId, ReactElement } from "react";
import clsx from "clsx";
import { IconType } from "react-icons";

type Props = {
  label?: string;
  value?: ComponentProps<"input">["value"];
  onClick?: ComponentProps<"input">["onClick"];
  onChange?: ComponentProps<"input">["onChange"];
  onFocus?: ComponentProps<"input">["onFocus"];
  onBlur?: ComponentProps<"input">["onBlur"];
  onKeyDown?: ComponentProps<"input">["onKeyDown"];
  onMouseEnter?: ComponentProps<"input">["onMouseEnter"];
  onMouseLeave?: ComponentProps<"input">["onMouseLeave"];
  placeholder?: ComponentProps<"input">["placeholder"];
  type?: ComponentProps<"input">["type"];
  disabled?: boolean;
  success?: boolean;
  Icon?: ReactElement;
  BeforeIcon?: IconType;
  AfterIcon?: IconType;
  className?: ComponentProps<"div">["className"];
  errors?: string[];
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      value,
      errors,
      onClick,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onMouseEnter,
      onMouseLeave,
      placeholder,
      type,
      disabled = false,
      success = false,
      BeforeIcon,
      AfterIcon,
      className,
    }: Props,
    ref,
  ) => {
    const id = useId();

    const hasErrors = errors && errors.length > 0;

    const labelClasses = clsx("block mb-[2px] text-[12px] pl-[4px] font-medium", {
      "text-gray-900": !success && !hasErrors,
      "text-green-700": success,
      "text-red-700": hasErrors,
    });

    const inputContainerClasses = clsx("text-sm rounded-lg flex items-center gap-x-2 px-2 w-full", {
      "bg-gray-50 border border-gray-300 text-gray-900 focus-within:ring-blue-500 focus-within:border-blue-500": !success && !hasErrors && !disabled,
      "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm focus-within:ring-green-500 focus-within:border-green-500":
        success && !disabled,
      "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus-within:ring-red-500 focus-within:border-red-500": hasErrors && !disabled,
      "bg-gray-100 border border-gray-300 text-gray-900 focus-within:ring-blue-500 focus-within:border-blue-500 cursor-not-allowed": disabled,
    });

    const inputClasses = clsx("flex-grow border-0 ring-0 outline-none bg-transparent py-2.5", {});

    const beforeIconClasses = clsx("w-5 h-5 text-gray-500 pointer-events-none", {
      "text-gray-500": !success && !hasErrors,
      "text-red-600": hasErrors,
      "text-green-600": success,
    });

    const afterIconClasses = clsx("w-5 h-5 text-gray-500 pointer-events-none", {
      "text-gray-500": !success && !hasErrors,
      "text-red-600": hasErrors,
      "text-green-600": success,
    });

    return (
      <div className={clsx(className)}>
        {label && (
          <label htmlFor={id} className={labelClasses}>
            {label}
          </label>
        )}

        <div className={inputContainerClasses} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          {BeforeIcon && <BeforeIcon className={beforeIconClasses} />}
          <input
            ref={ref}
            id={id}
            type={type}
            className={inputClasses}
            placeholder={placeholder}
            value={value}
            autoComplete="off"
            disabled={disabled}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
          />
          {AfterIcon && <AfterIcon className={afterIconClasses} />}
        </div>

        {hasErrors && errors.length > 0 && (
          <ul className="mt-1 flex flex-col">
            {errors.map((error) => (
              <li key={error} className="text-xs text-red-600">
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

export default Input;
