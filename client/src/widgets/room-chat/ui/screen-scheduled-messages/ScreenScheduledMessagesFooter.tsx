import BaseScreenFooter from "../base/BaseScreenFooter";
import SendMessageForm from "@/widgets/room-chat/ui/SendMessageForm/SendMessageForm.tsx";

const ScreenScheduledMessagesFooter = () => {
  return (
    <BaseScreenFooter>
      <SendMessageForm onlyScheduledMessages showScheduledMessagesButton={false} />
    </BaseScreenFooter>
  );
};

export default ScreenScheduledMessagesFooter;
