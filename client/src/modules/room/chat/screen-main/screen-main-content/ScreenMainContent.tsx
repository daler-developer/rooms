import MessagesList from "@/widgets/room-chat/ui/screen-main/MessagesList.tsx";
import BaseScreen from "../../base/BaseScreen.tsx";

const ScreenMainContent = () => {
  return (
    <BaseScreen.Content>
      <MessagesList />
    </BaseScreen.Content>
  );
};

export default ScreenMainContent;
