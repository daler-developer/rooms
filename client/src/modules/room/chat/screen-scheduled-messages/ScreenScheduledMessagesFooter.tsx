import BaseScreen from "../base/BaseScreen";
import SendMessageForm from "../send-message-form/SendMessageForm";

const ScreenScheduledMessagesFooter = () => {
  return (
    <BaseScreen.Footer>
      <SendMessageForm />
    </BaseScreen.Footer>
  );
};

export default ScreenScheduledMessagesFooter;
