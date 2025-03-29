import SendMessageForm from "@/widgets/room-chat/ui/SendMessageForm/SendMessageForm.tsx";
import BaseScreen from "../../base/BaseScreen.tsx";

const ScreenMainFooter = () => {
  return (
    <BaseScreen.Footer>
      <SendMessageForm />
    </BaseScreen.Footer>
  );
};

export default ScreenMainFooter;
