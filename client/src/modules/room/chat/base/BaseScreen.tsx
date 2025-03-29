import { ReactNode } from "react";
import BaseScreenHeader from "./BaseScreenHeader";
import BaseScreenContent from "./BaseScreenContent";
import BaseScreenFooter from "./BaseScreenFooter";

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

BaseScreen.Header = BaseScreenHeader;
BaseScreen.Content = BaseScreenContent;
BaseScreen.Footer = BaseScreenFooter;

export default BaseScreen;
