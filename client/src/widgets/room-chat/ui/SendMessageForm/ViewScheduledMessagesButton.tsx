import { CiCalendar } from "react-icons/ci";
import { IconButton } from "@/shared/ui";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import { useSubscription } from "@apollo/client";
import { NEW_MESSAGE_SUB } from "@/widgets/room-chat/gql/tags.ts";
import useRoomQuery from "@/widgets/room-chat/hooks/useRoomQuery.ts";

const ViewScheduledMessagesButton = () => {
  const { setShowScheduledMessages } = useRoomChatStore();

  const queries = {
    room: useRoomQuery(),
  };

  useSubscription(NEW_MESSAGE_SUB, {
    onData({ data }) {
      const newMessage = data.data!.newMessage.message;
    },
  });

  return (
    <IconButton
      type="button"
      Icon={CiCalendar}
      color="light"
      withBadge
      badgeContent={queries.room.data!.room.myScheduledMessagesCount}
      onClick={() => {
        setShowScheduledMessages(true);
      }}
    />
  );
};

export default ViewScheduledMessagesButton;
