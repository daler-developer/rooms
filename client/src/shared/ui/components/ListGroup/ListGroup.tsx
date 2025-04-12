import { ReactNode, Children } from "react";
import ListGroupItem from "./ListGroupItem.tsx";
import { ListGroupContext } from "./listGroupContext.ts";
import { ListGroupItemContext } from "./listGroupItemContext.ts";

type Props = {
  children: ReactNode;
};

const ListGroup = ({ children }: Props) => {
  return (
    <ListGroupContext.Provider value={{ totalItems: Children.count(children) }}>
      <div className="text-gray-900 bg-white border border-gray-200 rounded-lg">
        {Children.map(children, (child, index) => (
          <ListGroupItemContext.Provider value={{ index }}>{child}</ListGroupItemContext.Provider>
        ))}
      </div>
    </ListGroupContext.Provider>
  );
};

ListGroup.Item = ListGroupItem;

export default ListGroup;
