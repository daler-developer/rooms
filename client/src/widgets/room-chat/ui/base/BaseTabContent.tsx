import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const BaseTabContent = ({ children }: Props) => {
  return <div className="flex-grow">{children}</div>;
};

export default BaseTabContent;
