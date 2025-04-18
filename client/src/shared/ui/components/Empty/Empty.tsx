import { FaInbox } from "react-icons/fa";

type Props = {
  title?: string;
};

const Empty = ({ title = "There is no content available." }: Props) => {
  return (
    <div className="rounded text-center">
      <FaInbox className="text-6xl text-gray-400 mx-auto -mt-3" />
      <h1 className="-mt-1 text-3xl font-bold text-gray-700">Empty</h1>
      <p className="mt-1 text-gray-500">{title}</p>
    </div>
  );
};

export default Empty;
