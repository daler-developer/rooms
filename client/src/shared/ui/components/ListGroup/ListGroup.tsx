import { ReactNode } from "react";
import ListGroupItem from "./ListGroupItem.tsx";

type Props = {
  children: ReactNode;
};

const ListGroup = ({ children }: Props) => {
  return <div className="text-gray-900 bg-white border border-gray-200 rounded-lg">{children}</div>;
};

ListGroup.Item = ListGroupItem;

export default ListGroup;
