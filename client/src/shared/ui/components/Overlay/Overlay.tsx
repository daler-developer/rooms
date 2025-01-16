import { ComponentProps } from "react";

type Props = {
  onClick: ComponentProps<"div">["onClick"];
};

const Overlay = ({ onClick }: Props) => {
  return <div className="fixed top-0 left-0 bottom-0 right-0 bg-black opacity-90 z-[900]" onClick={onClick} />;
};

export default Overlay;
