import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const BaseTab = ({ children }: Props) => {
  return <div className="w-full h-screen flex flex-col bg-gray-300">{children}</div>;
};

export default BaseTab;
