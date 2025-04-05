import { HiOutlineEye } from "react-icons/hi2";

type Props = {
  viewsCount: number;
};

const BaseMessageViewsCount = ({ viewsCount }: Props) => {
  return (
    <div className="flex items-center gap-[3px] -mb-[5px]">
      <HiOutlineEye className="text-[14px]" />
      <span className="text-[10px]">{viewsCount}</span>
    </div>
  );
};

export default BaseMessageViewsCount;
