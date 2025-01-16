import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  gap: number;
  children: ReactNode;
};

const VStack = ({ gap, children }: Props) => {
  return <div className={clsx("flex flex-col", `gap-[${gap}px]`)}>{children}</div>;
};

export default VStack;
