import BaseMessagesList from "@/widgets/room-chat/ui/base/BaseMessagesList.tsx";
import useRoomQuery from "@/widgets/room-chat/hooks/useRoomQuery.ts";
import ScheduledMessage from "@/widgets/room-chat/ui/ScheduledMessages/ScheduledMessage.tsx";
import TemporaryScheduledMessage from "./TemporaryScheduledMessage";
import { useSubscription } from "@apollo/client";
import { NEW_MESSAGE_SUB } from "@/widgets/room-chat/gql/tags.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import { useMemo } from "react";
import ScheduledMessagesScheduledAtDivider from "./ScheduledMessagesScheduledAtDivider";
import dayjs from "dayjs";
import { useKeyboard } from "@/shared/hooks";

const ScheduledMessagesList = () => {
  const { roomId, temporaryScheduledMessages, clearScheduledSelectedMessages } = useRoomChatStore();

  useKeyboard({
    Escape: () => {
      clearScheduledSelectedMessages();
    },
  });

  const queries = {
    room: useRoomQuery(),
  };

  useSubscription(NEW_MESSAGE_SUB, {
    onData({ data, client }) {
      const newMessage = data.data!.newMessage.message;
      const isScheduled = !newMessage.sentAt;

      if (isScheduled) {
        client.cache.modify({
          id: client.cache.identify({ __typename: "Room", id: roomId }),
          fields: {
            scheduledMessages(existingData, { toReference }) {
              return {
                data: [toReference(newMessage), ...existingData.data],
                hasMore: existingData.hasMore,
              };
            },
          },
        });
      }
    },
  });

  const items = useMemo(() => {
    const scheduledMessagesFromServer = queries.room.data!.room.scheduledMessages.data.map((m) => ({ ...m, isTemporary: false as const }));
    const allScheduledMessages = [...scheduledMessagesFromServer, ...temporaryScheduledMessages];
    const allScheduledMessagesSorted = allScheduledMessages.sort((a, b) => new Date(a.scheduledAt!) - new Date(b.scheduledAt));

    if (allScheduledMessagesSorted.length === 0) {
      return [];
    }

    const firstMessage = allScheduledMessagesSorted[0];

    const result = [<ScheduledMessagesScheduledAtDivider key={firstMessage.scheduledAt} scheduledAt={firstMessage.scheduledAt!} />];

    if (firstMessage.isTemporary) {
      result.push(<TemporaryScheduledMessage key={firstMessage.temporaryId} temporaryScheduledMessage={firstMessage} />);
    } else {
      result.push(<ScheduledMessage key={firstMessage.id} message={firstMessage} />);
    }

    for (let i = 1; i < allScheduledMessagesSorted.length; i++) {
      const message = allScheduledMessagesSorted[i];
      const prevMessage = allScheduledMessagesSorted[i - 1];
      const messageAndPrevMessageScheduledOnTheSameDay = dayjs(message.scheduledAt).isSame(dayjs(prevMessage.scheduledAt), "day");

      if (!messageAndPrevMessageScheduledOnTheSameDay) {
        result.push(<ScheduledMessagesScheduledAtDivider key={message.scheduledAt} scheduledAt={message.scheduledAt!} />);
      }

      if (message.isTemporary) {
        result.push(<TemporaryScheduledMessage key={message.temporaryId} temporaryScheduledMessage={message} />);
      } else {
        result.push(<ScheduledMessage key={message.id} message={message} />);
      }
    }

    return result;
  }, [queries.room.data, temporaryScheduledMessages]);

  return (
    <BaseMessagesList
      onScrollToTop={() => {}}
      onReachTopThreshold={() => {}}
      showSpinner={false}
      showEmptyState={items.length === 0}
      emptyStateTitle="No sheduled messages"
    >
      {items}
    </BaseMessagesList>
  );
};

export default ScheduledMessagesList;
