import BaseTabFooter from "../base/BaseTabFooter";
import SendMessageForm from "@/widgets/room-chat/ui/SendMessageForm/SendMessageForm.tsx";

const TabScheduledMessagesFooter = () => {
  return (
    <BaseTabFooter>
      <SendMessageForm onlyScheduledMessages showScheduledMessagesButton={false} />
    </BaseTabFooter>
  );
};

export default TabScheduledMessagesFooter;
