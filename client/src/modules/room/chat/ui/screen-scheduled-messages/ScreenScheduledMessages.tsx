import BaseScreen from "../base/BaseScreen.tsx";
import ScreenScheduledMessagesHeader from "./ScreenScheduledMessagesHeader.tsx";
import ScreenScheduledMessagesContent from "./ScreenScheduledMessagesContent.tsx";
import ScreenScheduledMessagesFooter from "./ScreenScheduledMessagesFooter.tsx";

const ScreenScheduledMessages = () => {
  return <BaseScreen header={<ScreenScheduledMessagesHeader />} content={<ScreenScheduledMessagesContent />} footer={<ScreenScheduledMessagesFooter />} />;
};

export default ScreenScheduledMessages;
