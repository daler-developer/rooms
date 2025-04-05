type Props = {
  children: string;
};

const BaseMessagesListDivider = ({ children }: Props) => {
  return (
    <div className="flex items-center gap-1 mb-4">
      <div className="h-[0.5px] flex-grow bg-gray-600"></div>

      <div className="font-medium text-[11px] text-gray-500">{children}</div>

      <div className="h-[0.5px] flex-grow bg-gray-600"></div>
    </div>
  );
};

export default BaseMessagesListDivider;
