import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const BaseTabContent = ({ children }: Props) => {
  return <div className="flex-grow overflow-hidden">{children}</div>;
};

export default BaseTabContent;
