import { ReactElement } from "react";

type Props = {
  headerLeft: ReactElement;
  headerRight: ReactElement;
  children: ReactElement;
};

const BaseTab = ({ headerLeft, headerRight, children }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="basis-[70px] shrink-0 flex items-center justify-between gap-2 px-2 border border-b-gray-300">
        <div>{headerLeft}</div>
        <div>{headerRight}</div>
      </div>

      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default BaseTab;
