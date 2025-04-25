import { ElementRef, ReactNode, useEffect, useMemo, useRef } from "react";
import dayjs from "dayjs";
import BaseMessagesList from "../base/BaseMessagesList";
import { useRoomChatStore, type TemporaryScheduledMessage as TemporaryScheduledMessageType } from "../store";
import { useKeyboard } from "@/shared/hooks";
import useGetScheduledMessagesQuery from "../gql/useGetScheduledMessagesQuery.ts";
import ScheduledMessage from "./ScheduledMessage.tsx";
import { RoomChatGetScheduledMessagesQuery } from "@/__generated__/graphql.ts";
import TemporaryScheduledMessage from "./TemporaryScheduledMessage.tsx";
import { useRoomChatEmitter, EventCallback } from "../emitter.ts";

const ScheduledMessagesList = () => {
  const roomChatStore = useRoomChatStore();
  const baseMessagesComp = useRef<ElementRef<typeof BaseMessagesList>>(null!);
  const emitter = useRoomChatEmitter();

  const queries = {
    scheduledMessage: useGetScheduledMessagesQuery(),
  };

  useEffect(() => {
    const handler: EventCallback<"SCHEDULED_MESSAGE_INSERTED"> = () => {
      baseMessagesComp.current.scrollToBottom();
    };

    emitter.on("SCHEDULED_MESSAGE_INSERTED", handler);

    return () => {
      emitter.off("SCHEDULED_MESSAGE_INSERTED", handler);
    };
  }, []);

  useKeyboard({
    Escape: () => {
      roomChatStore.setSelectedScheduledMessages([]);
    },
  });

  const messages = useMemo(() => {
    const items: ReactNode[] = [];

    const allMessages = [
      ...queries.scheduledMessage.data!.room.scheduledMessages.data.map((message) => ({ data: message, isTemporary: false })),
      ...roomChatStore.temporaryScheduledMessages.map((message) => ({ data: message, isTemporary: true })),
    ];

    const sortedAllMessages = allMessages.sort((a, b) => new Date(a.data.scheduledAt!).getTime() - new Date(b.data.scheduledAt!).getTime());

    for (let i = 0; i < sortedAllMessages.length; i++) {
      const message = sortedAllMessages[i];
      const isFirstMessage = i === 0;
      const prevMessage = sortedAllMessages[i - 1];
      const hasPrevMessage = Boolean(prevMessage);
      const messageScheduledOnAnotherDay = hasPrevMessage ? !dayjs(message.data.scheduledAt!).isSame(dayjs(prevMessage.data.scheduledAt!), "day") : false;
      const withScheduledAtDivider = isFirstMessage || (hasPrevMessage && messageScheduledOnAnotherDay);

      if (message.isTemporary) {
        items.push(
          <TemporaryScheduledMessage
            key={message.data.id}
            temporaryScheduledMessage={message.data as TemporaryScheduledMessageType}
            withScheduledAtDivider={withScheduledAtDivider}
          />,
        );
      } else {
        items.push(
          <ScheduledMessage
            key={message.data.id}
            message={message.data as Flatten<RoomChatGetScheduledMessagesQuery["room"]["scheduledMessages"]["data"]>}
            withScheduledAtDivider={withScheduledAtDivider}
          />,
        );
      }
    }

    return items;
  }, [queries.scheduledMessage.data, roomChatStore.temporaryScheduledMessages]);

  return (
    <BaseMessagesList
      ref={baseMessagesComp}
      selectedMessages={roomChatStore.selectedScheduledMessages}
      onSelectedMessagesChange={roomChatStore.setSelectedScheduledMessages}
      noDataMessage="No scheduled messages"
    >
      {messages}
    </BaseMessagesList>
  );
};

export default ScheduledMessagesList;
