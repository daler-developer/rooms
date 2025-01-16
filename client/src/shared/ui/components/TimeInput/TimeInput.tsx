import { useRef, useState, ChangeEvent, forwardRef, useImperativeHandle } from "react";

export type Time = {
  hours: number;
  minutes: number;
};

type Props = {
  value: Time;
  onChange: (to: Time) => void;
};

const parseHours = (str: string) => {
  const num = Number(str);

  const isBetween0and23 = Number(str) >= 0 && Number(str) <= 23;

  if (isBetween0and23) {
    return num;
  }

  return 23;
};

const parseMinutes = (str: string) => {
  const num = Number(str);

  const isBetween0and59 = Number(str) >= 0 && Number(str) <= 59;

  if (isBetween0and59) {
    return num;
  }

  return 59;
};

export type TimeInputHandle = {
  setValue: (v: Time) => void;
};

const TimeInput = forwardRef<TimeInputHandle, Props>(({ value, onChange }, ref) => {
  const [hoursInputValue, setHoursInputValue] = useState(() => String(value.hours).padStart(2, "0"));
  const [minutesInputValue, setMinutesInputValue] = useState(() => String(value.minutes).padStart(2, "0"));

  const hoursInputRef = useRef<HTMLInputElement>(null!);
  const minutesInputRef = useRef<HTMLInputElement>(null!);

  const handleHoursInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parsed = parseHours(e.target.value);

    onChange({
      hours: parsed,
      minutes: value.minutes,
    });
    setHoursInputValue(String(parsed).padStart(2, "0"));
  };

  const handleMinutesInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parsed = parseMinutes(e.target.value);

    onChange({
      hours: value.hours,
      minutes: parsed,
    });
    setMinutesInputValue(String(parsed).padStart(2, "0"));
  };

  const handleHoursInputBlue = (e: ChangeEvent<HTMLInputElement>) => {};

  const handleMinutesInputBlue = (e: ChangeEvent<HTMLInputElement>) => {};

  useImperativeHandle(ref, () => ({
    setValue({ minutes, hours }) {
      onChange({
        hours,
        minutes,
      });

      setHoursInputValue(String(hours).padStart(2, "0"));
      setMinutesInputValue(String(minutes).padStart(2, "0"));
    },
  }));

  return (
    <div className="inline-flex items-center gap-x-[5px]">
      <div className="w-[100px]">
        <input
          className="py-1 rounded-md w-full text-center bg-gray-50 border border-gray-300 text-gray-900 focus-within:ring-blue-500 focus-within:border-blue-500"
          ref={hoursInputRef}
          type="text"
          value={hoursInputValue}
          onBlur={handleHoursInputBlue}
          onChange={handleHoursInputChange}
          onPaste={(e) => {
            e.preventDefault();
          }}
        />
      </div>
      <span>:</span>
      <div className="w-[100px]">
        <input
          className="py-1 rounded-md w-full text-center bg-gray-50 border border-gray-300 text-gray-900 focus-within:ring-blue-500 focus-within:border-blue-500"
          ref={minutesInputRef}
          type="text"
          value={minutesInputValue}
          onChange={handleMinutesInputChange}
          onBlur={handleMinutesInputBlue}
        />
      </div>
    </div>
  );
});

export default TimeInput;
