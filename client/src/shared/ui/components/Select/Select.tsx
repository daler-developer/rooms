import useFloating from "../../hooks/useFloating.ts";
import { ReactElement } from "react";
import Input from "../Input/Input.tsx";
import clsx from "clsx";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";

type SelectOption = {
  Icon?: ReactElement;
  label: string;
  value: string;
};

type Props = {
  options: SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
};

const Select = ({ options, value, onChange, placeholder = "Select value" }: Props) => {
  const { floatingStyles, floatingRef, referenceRef, close } = useFloating({
    placement: "bottom",
    width: "full",
    offset: 10,
    openTrigger: "click",
  });

  const optionsListClasses = clsx(
    "bg-white border py-1 overflow-auto text-base leading-6 rounded-md shadow-lg max-h-60 focus:outline-none sm:text-sm sm:leading-5",
  );

  const selectedOption = options.find((option) => option.value === value) || null;

  return (
    <div>
      <div ref={referenceRef}>
        <Input BeforeIcon={HiChevronUpDown} value={selectedOption?.label} placeholder={placeholder} />
      </div>

      <ul ref={floatingRef} className={optionsListClasses} style={floatingStyles}>
        {options.map((option) => {
          const withIcon = Boolean(option.Icon);
          const isSelected = option.value === value;

          const optionsListItemClasses = clsx("flex items-center gap-x-[6px] px-2 py-2 cursor-pointer hover:bg-indigo-600 group");

          const handleSelect = () => {
            onChange(option.value);
            close();
          };

          return (
            <li key={option.value} className={optionsListItemClasses} onClick={handleSelect}>
              <div className="w-[22px]">{withIcon && <option.Icon className="text-[18px] text-gray-900 group-hover:text-white" />}</div>

              <span
                className={clsx("block flex-grow text-gray-900 group-hover:text-white", {
                  "font-semibold": isSelected,
                  "font-normal": !isSelected,
                })}
              >
                {option.label}
              </span>

              {
                <HiCheck
                  className={clsx("text-[22px] text-gray-900 group-hover:text-white", {
                    "opacity-0": !isSelected,
                  })}
                />
              }
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
