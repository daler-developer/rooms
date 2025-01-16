import { useId } from "react";
import clsx from "clsx";

type LabelPosition = "left" | "right";

type Props = {
  label?: string;
  labelPosition?: LabelPosition;
  checked: boolean;
  onChange: (to: boolean) => void;
  disabled?: boolean;
};

const Checkbox = ({ label, checked, onChange, labelPosition = "right", disabled = false }: Props) => {
  const checkboxId = useId();

  const inputClasses = clsx({
    "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600":
      true,
  });

  const labelClasses = clsx({
    "text-sm font-medium text-gray-900 dark:text-gray-300": !disabled,
    "text-sm font-medium text-gray-400 dark:text-gray-500": disabled,
  });

  return (
    <div
      className={clsx("inline-flex items-center gap-2", {
        "flex-row-reverse": labelPosition === "left",
      })}
    >
      <input id={checkboxId} type="checkbox" disabled={disabled} checked={checked} onChange={(e) => onChange(e.target.checked)} className={inputClasses} />
      {label && (
        <label className={labelClasses} htmlFor={checkboxId}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
