import { HiOutlineEye } from "react-icons/hi2";

type Props = {
  count: number;
};

const BaseViewsCount = ({ count }: Props) => {
  return (
    <div className="flex items-center gap-1">
      <HiOutlineEye className="text-[15px]" />
      <span className="text-[12px]">{count}</span>
    </div>
  );
};

export default BaseViewsCount;
