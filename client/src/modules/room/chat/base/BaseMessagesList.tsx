import { ReactNode } from "react";
import { Scroll } from "@/shared/ui";

type Props = {
  children: ReactNode[];
};

const BaseMessagesList = ({ children }: Props) => {
  return (
    <Scroll height="full">
      <div className="flex flex-col gap-6 pt-8 pb-8">{children}</div>
    </Scroll>
  );
};

export default BaseMessagesList;
