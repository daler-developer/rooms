import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const BaseScreenContent = ({ children }: Props) => {
  return <div className="flex-grow overflow-hidden">{children}</div>;
};

export default BaseScreenContent;
