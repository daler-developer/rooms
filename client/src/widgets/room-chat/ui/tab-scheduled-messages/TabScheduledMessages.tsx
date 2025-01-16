import BaseTab from "../base/BaseTab";
import TabScheduledMessagesHeader from "./TabScheduledMessagesHeader";
import TabScheduledMessagesContent from "./TabScheduledMessagesContent";
import TabScheduledMessagesFooter from "./TabScheduledMessagesFooter";

const TabScheduledMessages = () => {
  return (
    <BaseTab>
      <TabScheduledMessagesHeader />
      <TabScheduledMessagesContent />
      <TabScheduledMessagesFooter />
    </BaseTab>
  );
};

export default TabScheduledMessages;
