import { Empty, Spinner } from "@/shared/ui";
import { forwardRef, ReactNode } from "react";
import Scroll, { type ScrollHandle } from "@/shared/ui/components/ScrollV2/Scroll";

type Props = {
  children: ReactNode;
};

const BaseMessagesList = forwardRef<ScrollHandle, Props>(({ children }) => {
  return <div className="flex flex-col gap-6 pt-4 pb-4">{children}</div>;
});

export default BaseMessagesList;
