import { ReactNode } from "react";

type Props = {
  header?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
};

const BaseScreen = ({ header, content, footer }: Props) => {
  return (
    <div className="w-full h-screen flex flex-col bg-gray-300">
      {header}
      {content}
      {footer}
    </div>
  );
};

export default BaseScreen;
