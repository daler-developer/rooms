import { type GetRoomQuery } from "@/__generated__/graphql.ts";
import BaseMessage from "@/widgets/room-chat/ui/base/BaseMessage.tsx";
import BaseScheduledAt from "@/widgets/room-chat/ui/base/BaseScheduledAt.tsx";
import useSendScheduledMessagesNowMutation from "../../gql/useSendScheduledMessagesNowMutation.ts";
import useDeleteMessagesMutation from "../../gql/useDeleteMessagesMutation.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import { useQuery } from "@apollo/client";
import { GET_ME } from "@/widgets/room-chat/gql/tags.ts";

type Props = {
  message: Flatten<GetRoomQuery["room"]["scheduledMessages"]["data"]>;
};

const ScheduledMessage = ({ message }: Props) => {
  const { roomId, selectedScheduledMessages, addSelectedScheduledMessage, removeSelectedScheduledMessages } = useRoomChatStore();

  const queries = {
    me: useQuery(GET_ME),
  };

  const [sendScheduledMessagesNowMutation] = useSendScheduledMessagesNowMutation();
  const [deleteMessages] = useDeleteMessagesMutation();

  const contextMenuItems = [
    {
      label: "Select",
      onClick() {
        addSelectedScheduledMessage(message.id);
      },
    },
    {
      label: "Send now",
      async onClick() {
        await sendScheduledMessagesNowMutation({
          messageIds: [message.id],
        });
      },
    },
    {
      label: "Delete",
      async onClick() {
        await deleteMessages({
          roomId,
          messageIds: [message.id],
        });
      },
    },
  ];

  const isSelected = selectedScheduledMessages.includes(message.id);

  return (
    <BaseMessage
      contextMenuItems={contextMenuItems}
      senderIsOnline={true}
      senderIsMe={true}
      senderFirstName={queries.me.data!.me.firstName}
      senderLastName={queries.me.data!.me.lastName}
      senderProfilePictureUrl={queries.me.data!.me.profilePictureUrl}
      scheduledAt={message.scheduledAt!}
      isSelected={isSelected}
      isInSelectMode={selectedScheduledMessages.length > 0}
      onSelect={() => addSelectedScheduledMessage(message.id)}
      onDeselect={() => removeSelectedScheduledMessages([message.id])}
    >
      <div>{message.text}</div>
    </BaseMessage>
  );
};

export default ScheduledMessage;
