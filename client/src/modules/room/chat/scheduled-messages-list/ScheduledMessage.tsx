import { MdDeleteOutline } from "react-icons/md";
import { LuSend } from "react-icons/lu";
import { type RoomChatGetScheduledMessagesQuery } from "@/__generated__/graphql.ts";
import BaseMessage from "../base/BaseMessage.tsx";
import useSendScheduledMessagesNowMutation from "../gql/useSendScheduledMessagesNowMutation.ts";
import useDeleteScheduledMessagesMutation from "../gql/useDeleteScheduledMessagesMutation.ts";
import useGetMeQuery from "../gql/useGetMeQuery.ts";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useRoomId } from "../context";

type Props = {
  message: Flatten<RoomChatGetScheduledMessagesQuery["room"]["scheduledMessages"]["data"]>;
  withScheduledAtDivider: boolean;
};

const ScheduledMessage = ({ message, withScheduledAtDivider }: Props) => {
  const roomId = useRoomId();

  const queries = {
    me: useGetMeQuery(),
  };
  const mutations = {
    sendScheduledMessagesNow: useSendScheduledMessagesNowMutation(),
    deleteScheduledMessages: useDeleteScheduledMessagesMutation(),
  };

  const formattedScheduledAt = useMemo(() => {
    return "Scheduled on " + dayjs(message.scheduledAt!).format("MMMM D, YYYY");
  }, [message.scheduledAt]);

  return (
    <BaseMessage
      id={message.id}
      selectable
      contextMenuActions={[
        {
          label: "Send now",
          Icon: LuSend,
          async onClick() {
            await mutations.sendScheduledMessagesNow.mutate(roomId, { messageIds: [message.id] });
          },
        },
        {
          label: "Delete",
          Icon: MdDeleteOutline,
          async onClick() {
            await mutations.deleteScheduledMessages.mutate({ roomId, variables: { messageIds: [message.id] } });
          },
        },
      ]}
      imageUrls={message.images.map((image) => image.url)}
      text={message.text}
      senderIsOnline={true}
      senderIsMe={true}
      senderFirstName={queries.me.data!.me.firstName}
      senderLastName={queries.me.data!.me.lastName}
      senderProfilePictureUrl={queries.me.data!.me.profilePictureUrl}
      bottomRight={<BaseMessage.ScheduledAt scheduledAt={message.scheduledAt!} />}
      divider={withScheduledAtDivider && <BaseMessage.Divider>{formattedScheduledAt}</BaseMessage.Divider>}
    />
  );
};

export default ScheduledMessage;
