import { ReactNode, useMemo } from "react";
import dayjs from "dayjs";
import { RoomChatGetMessagesQuery } from "@/__generated__/graphql.ts";
import BaseMessagesList from "../base/BaseMessagesList.tsx";
import Message from "./Message.tsx";
import TemporaryMessage from "./TemporaryMessage.tsx";
import useGetMessagesQuery from "../gql/useGetMessagesQuery.ts";
import { useRoomChatStore, TemporaryMessage as TemporaryMessageType } from "../store";

const MessagesList = () => {
  const roomChatStore = useRoomChatStore();

  const queries = {
    messages: useGetMessagesQuery(),
  };

  const messages = useMemo(() => {
    if (queries.messages.data) {
      const items: ReactNode[] = [];

      const allMessages = [
        ...queries.messages.data!.room.messages.data.map((message) => ({ isTemporary: false, data: message })),
        ...roomChatStore.temporaryMessages.map((message) => ({ isTemporary: true, data: message })),
      ];

      const sortedAllMessages = allMessages.sort((a, b) => new Date(a.data.sentAt!).getTime() - new Date(b.data.sentAt!).getTime());

      for (let i = 0; i < sortedAllMessages.length; i++) {
        const message = sortedAllMessages[i];
        const isFirstMessage = i === 0;
        const prevMessage = sortedAllMessages[i - 1];
        const hasPrevMessage = Boolean(prevMessage);
        const messageSentOnAnotherDay = hasPrevMessage ? !dayjs(message.data.sentAt).isSame(dayjs(prevMessage.data.sentAt), "day") : false;
        const withSentAtDivider = isFirstMessage || (hasPrevMessage && messageSentOnAnotherDay);

        if (message.isTemporary) {
          items.push(<TemporaryMessage key={message.data.id} temporaryMessage={message.data as TemporaryMessageType} withSentAtDivider={withSentAtDivider} />);
        } else {
          items.push(
            <Message
              key={message.data.id}
              message={message.data as Flatten<RoomChatGetMessagesQuery["room"]["messages"]["data"]>}
              withSentAtDivider={withSentAtDivider}
            />,
          );
        }
      }

      return items;
    }

    return [];
  }, [queries.messages.data, roomChatStore.temporaryMessages]);

  if (queries.messages.data) {
    return <BaseMessagesList>{messages}</BaseMessagesList>;
  }

  return null;
};

export default MessagesList;
