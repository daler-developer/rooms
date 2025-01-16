import BaseMessagesList from "../base/BaseMessagesList";
import useGetScheduledMessagesQuery from "../../gql/useGetScheduledMessagesQuery";
import ScheduledMessage from "@/widgets/room-chat/ui/ScheduledMessages/ScheduledMessage.tsx";
import TemporaryScheduledMessage from "./TemporaryScheduledMessage";
import { useSubscription } from "@apollo/client";
import { NEW_MESSAGE_SUB } from "@/widgets/room-chat/gql/tags.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import { useEffect, useMemo } from "react";
import ScheduledMessagesScheduledAtDivider from "./ScheduledMessagesScheduledAtDivider";
import dayjs from "dayjs";
import { useKeyboard } from "@/shared/hooks";
import { useScrollControl } from "@/shared/ui";
import Scroll from "@/shared/ui/components/ScrollV2/Scroll.tsx";
import emitter, { EventCallback } from "@/widgets/room-chat/emitter.ts";

const ScheduledMessagesList = () => {
  const { roomId, temporaryScheduledMessages, clearScheduledSelectedMessages } = useRoomChatStore();

  const scrollControl = useScrollControl();

  useEffect(() => {
    const handler: EventCallback<"SCHEDULED_MESSAGE_INSERTED"> = () => {
      scrollControl.scrollToBottom();
    };

    emitter.on("SCHEDULED_MESSAGE_INSERTED", handler);

    return () => {
      emitter.off("SCHEDULED_MESSAGE_INSERTED", handler);
    };
  }, [scrollControl.scrollToBottom]);

  useEffect(() => {
    scrollControl.scrollToBottom();
  }, []);

  useKeyboard({
    Escape: () => {
      clearScheduledSelectedMessages();
    },
  });

  const queries = {
    scheduledMessages: useGetScheduledMessagesQuery(),
  };

  useSubscription(NEW_MESSAGE_SUB, {
    onData({ data, client }) {
      const newMessage = data.data!.newMessage.message;
      const isScheduled = !!newMessage.scheduledAt;

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
    variables: {
      skipFromCurrentSession: true,
    },
  });

  const items = useMemo(() => {
    const scheduledMessagesFromServer = queries.scheduledMessages.data!.room.scheduledMessages.data.map((m) => ({ ...m, isTemporary: false as const }));
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
  }, [queries.scheduledMessages.data, temporaryScheduledMessages]);

  return (
    <div className="h-full">
      <Scroll ref={scrollControl.ref} height="full">
        <BaseMessagesList>{items}</BaseMessagesList>
      </Scroll>
    </div>
  );
};

export default ScheduledMessagesList;
