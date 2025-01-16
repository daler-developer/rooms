import Input from "../Input/Input.tsx";
import { FocusEventHandler, useEffect, useState } from "react";

type Props = {
  template: string;
};

const PhoneInputs = ({ template }: Props) => {
  const [value, setValue] = useState("");

  // useEffect(() => {
  //   const chars = template.split("");
  //
  //   for (let i = 0; i < chars.length; i++) {
  //     const char = chars[i];
  //
  //     if (char === "#") {
  //       break;
  //     }
  //
  //     setValue((prev) => prev + char);
  //   }
  //
  //   return () => {
  //     setValue("");
  //   };
  // }, [template]);

  useEffect(() => {}, [value, template]);

  return (
    <div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

export default PhoneInputs;
