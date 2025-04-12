import { RoomChatGetMessagesQuery } from "@/__generated__/graphql";
import BaseMessage from "../base/BaseMessage.tsx";
import { useAuth } from "@/modules/auth";
import dayjs from "dayjs";
import { useMemo } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useRoomId } from "../context";
import useDeleteMessagesMutation from "./../gql/useDeleteMessagesMutation.ts";
import useMarkMessageAsViewedMutation from "./../gql/useMarkMessageAsViewedMutation.ts";
import useMessageViewsCountChangeSub from "./../gql/useMessageViewsCountChangeSub.ts";

type Props = {
  message: Flatten<RoomChatGetMessagesQuery["room"]["messages"]["data"]>;
  withSentAtDivider: boolean;
};

const Message = ({ message, withSentAtDivider }: Props) => {
  const { userId } = useAuth();
  const roomId = useRoomId();

  const mutations = {
    deleteMessages: useDeleteMessagesMutation(),
    markMessageAsViewed: useMarkMessageAsViewedMutation(),
  };

  useMessageViewsCountChangeSub({ messageId: message.id });

  const formattedSentAt = useMemo(() => {
    return dayjs(message.sentAt!).format("MMMM D, YYYY");
  }, [message.sentAt]);

  const handleDelete = async () => {
    await mutations.deleteMessages.mutate({
      roomId,
      messageIds: [message.id],
    });
  };

  const handleMessageVisible = () => {
    if (message.isViewedByMe) {
      return;
    }

    mutations.markMessageAsViewed.mutate({
      messageId: message.id,
    });
  };

  return (
    <BaseMessage
      selectable
      id={message.id}
      text={message.text}
      imageUrls={message.images.map((image) => image.url)}
      senderIsOnline={message.sender.isOnline}
      senderIsMe={message.sender.id === userId}
      senderFirstName={message.sender.firstName}
      senderLastName={message.sender.lastName}
      senderProfilePictureUrl={message.sender.profilePictureUrl}
      bottomRight={<BaseMessage.SentAt sentAt={message.sentAt!} />}
      bottomLeft={<BaseMessage.ViewsCount viewsCount={message.viewsCount} />}
      divider={withSentAtDivider && <BaseMessage.Divider children={formattedSentAt} />}
      contextMenuActions={[
        {
          label: "Delete",
          Icon: MdDeleteOutline,
          onClick() {
            handleDelete();
          },
        },
      ]}
      onMessageVisible={handleMessageVisible}
    />
  );
};

export default Message;
