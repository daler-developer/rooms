import { IconType } from "react-icons";

type Props = {
  Icon: IconType;
  children: string;
  onClick?: () => void;
};

const ListGroupItem = ({ Icon, children, onClick }: Props) => {
  return (
    <button
      type="button"
      className="relative inline-flex items-center gap-2 w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
      onClick={onClick}
    >
      <Icon className="text-[18px]" />
      {children}
    </button>
  );
};

export default ListGroupItem;
