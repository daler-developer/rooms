import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const BaseScreenFooter = ({ children }: Props) => {
  return <div className="basis-[60px] shrink-0 bg-white">{children}</div>;
};

export default BaseScreenFooter;
