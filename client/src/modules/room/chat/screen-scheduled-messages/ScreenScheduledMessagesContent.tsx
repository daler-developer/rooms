import BaseScreen from "../base/BaseScreen";
import ScheduledMessagesList from "../scheduled-messages-list/ScheduledMessagesList";

const ScreenScheduledMessagesContent = () => {
  return (
    <BaseScreen.Content>
      <ScheduledMessagesList />
    </BaseScreen.Content>
  );
};

export default ScreenScheduledMessagesContent;
