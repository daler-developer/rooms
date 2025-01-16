import { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  to?: HTMLElement;
};

const Portal = ({ children, to = document.body }: Props) => {
  return createPortal(children, to);
};

export default Portal;
