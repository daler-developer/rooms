import { CiCalendar } from "react-icons/ci";
import { IconButton } from "@/shared/ui";
import { useRoomChatStore } from "../store";
import useGetRoomQuery from "../gql/useGetRoomQuery";

const ViewScheduledMessagesButton = () => {
  const { setTab } = useRoomChatStore();

  const queries = {
    room: useGetRoomQuery(),
  };

  return (
    <IconButton
      type="button"
      Icon={CiCalendar}
      color="light"
      withBadge
      badgeContent={queries.room.data!.room.myScheduledMessagesCount}
      onClick={() => {
        setTab("scheduled-messages");
      }}
    />
  );
};

export default ViewScheduledMessagesButton;
