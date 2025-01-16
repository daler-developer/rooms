import { ReactNode } from "react";

type Props = {
  left?: ReactNode;
  right?: ReactNode;
};

const BaseTabHeader = ({ left, right }: Props) => {
  return (
    <div className="flex items-center justify-between shrink-0 p-2 bg-shadow-lg bg-white border border-b-gray-300 basis-[70px]">
      <div>{left}</div>

      <div>{right}</div>
    </div>
  );
};

export default BaseTabHeader;
