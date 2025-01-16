import { NetworkStatus, useQuery, useSubscription } from "@apollo/client";
import { NEW_MESSAGE_SUB, MESSAGES_DELETED, GET_MESSAGES } from "@/widgets/room-chat/gql/tags.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import TemporaryMessage from "../Message/TemporaryMessage.tsx";
import Message from "../Message/Message.tsx";
import { useKeyboard } from "@/shared/hooks";
import { Empty, Skeleton, useScrollControl } from "@/shared/ui";
import useRoomQuery from "@/widgets/room-chat/hooks/useRoomQuery.ts";
import BaseMessagesList from "../base/BaseMessagesList.tsx";
import BaseMessageSkeletons from "../base/BaseMessageSkeletons.tsx";
import { ElementRef, useCallback, useEffect, useMemo, useRef } from "react";
import MessagesListSentAtDivider from "./MessagesListSentAtDivider.tsx";
import dayjs from "dayjs";
import emitter, { EventCallback } from "../../emitter.ts";
import Scroll from "@/shared/ui/components/ScrollV2/Scroll.tsx";

const MessagesList = () => {
  const { roomId, temporaryMessages, clearSelectedMessages } = useRoomChatStore();

  const scrollControl = useScrollControl();
  const skeletonsScrollControl = useScrollControl();

  useEffect(() => {
    const handler: EventCallback<"MESSAGE_INSERTED"> = ({ isMessageSentByCurrentUser }) => {
      if (isMessageSentByCurrentUser) {
        scrollControl.scrollToBottom();
      }

      if (!isMessageSentByCurrentUser && scrollControl.isScrolledToBottom) {
        scrollControl.scrollToBottom();
      }
    };

    emitter.on("MESSAGE_INSERTED", handler);

    return () => {
      emitter.off("MESSAGE_INSERTED", handler);
    };
  }, [scrollControl.isScrolledToBottom, scrollControl.scrollToBottom]);

  useSubscription(MESSAGES_DELETED, {
    variables: {
      roomId,
    },
    onData({ data, client }) {
      for (const messageId of data.data!.messagesDeleted.messageIds) {
        client.cache.evict({ id: client.cache.identify({ __typename: "Message", id: messageId }) });
      }
    },
  });

  useSubscription(NEW_MESSAGE_SUB, {
    onData({ data, client }) {
      const newMessage = data.data!.newMessage.message;
      const isScheduled = !newMessage.sentAt;
      const isScrolledToBottom = scrollControl.isScrolledToBottom;

      if (!isScheduled) {
        client.cache.modify({
          id: client.cache.identify({ __typename: "Room", id: roomId }),
          fields: {
            messages(existingData, { toReference }) {
              return {
                data: [toReference(newMessage), ...existingData.data],
                hasMore: existingData.hasMore,
              };
            },
          },
        });

        // This hack is needed to make sure that DOM is updated before scrolling to bottom.
        setTimeout(() => {
          if (isScrolledToBottom) {
            // scrollControl.scrollToBottom();
          }
        }, 0);
      }
    },
    variables: {
      skipFromCurrentSession: true,
    },
  });

  const queries = {
    messages: useQuery(GET_MESSAGES, {
      variables: {
        roomId,
        offset: 0,
      },
      notifyOnNetworkStatusChange: true,
    }),
  };

  useKeyboard({
    Escape: () => {
      clearSelectedMessages();
    },
  });

  const fetchMoreMessages = async () => {
    await queries.messages.fetchMore({
      variables: {
        offset: queries.messages.data!.room.messages.data.length,
      },
    });
  };

  const handleScrollToTop = async () => {
    // await fetchMoreMessages();
  };

  const handleScrollToTopWithThreshold = async () => {
    if ([NetworkStatus.ready].includes(queries.messages.networkStatus) && queries.messages.data!.room.messages.hasMore) {
      await fetchMoreMessages();
    }
  };

  const scrollableEl = useRef<HTMLElement>(null!);

  const messagesFromServer = useMemo(() => {
    return queries.messages.data?.room.messages.data || [];
  }, [queries.messages.data]);

  const items = useMemo(() => {
    if (messagesFromServer.length === 0 && temporaryMessages.length === 0) {
      return [];
    }

    const allMessages = [...messagesFromServer.map((m) => ({ ...m, isTemporary: false as const })), ...temporaryMessages].sort(
      (a, b) => new Date(a.sentAt!) - new Date(b.sentAt),
    );

    const firstMessage = allMessages[0];

    const result = [<MessagesListSentAtDivider key={firstMessage.sentAt} sentAt={firstMessage.sentAt} />];

    if (firstMessage.isTemporary) {
      result.push(<TemporaryMessage key={firstMessage.temporaryId} temporaryMessage={firstMessage} />);
    } else {
      result.push(<Message key={firstMessage.id} message={firstMessage} intersectionAnchor={scrollableEl} />);
    }

    for (let i = 1; i < allMessages.length; i++) {
      const message = allMessages[i];
      const prevMessage = allMessages[i - 1];

      const isFirstMessage = i === 0;

      if (isFirstMessage) {
        result.push(<MessagesListSentAtDivider key={message.sentAt} sentAt={message.sentAt!} />);
      } else {
        const isNotSameDayWithPrevMessage = !dayjs(message.sentAt).isSame(dayjs(prevMessage.sentAt), "day");

        if (isNotSameDayWithPrevMessage) {
          result.push(<MessagesListSentAtDivider key={message.sentAt} sentAt={message.sentAt!} />);
        }
      }

      if (message.isTemporary) {
        result.push(<TemporaryMessage key={message.temporaryId} temporaryMessage={message} />);
      } else {
        result.push(<Message key={message.id} message={message} intersectionAnchor={scrollableEl} />);
      }
    }

    return result;
  }, [messagesFromServer, temporaryMessages]);

  const showSkeletons = useMemo(() => {
    return queries.messages.networkStatus === NetworkStatus.loading;
  }, [queries.messages.networkStatus]);

  const showMessagesList = useMemo(() => {
    return [NetworkStatus.fetchMore, NetworkStatus.setVariables, NetworkStatus.ready].includes(queries.messages.networkStatus);
  }, [queries.messages.networkStatus]);

  const showEmptyState = useMemo(() => {
    return [NetworkStatus.ready].includes(queries.messages.networkStatus) && messagesFromServer.length === 0 && temporaryMessages.length === 0;
  }, [queries.messages.networkStatus, messagesFromServer, temporaryMessages]);

  useEffect(() => {
    if (showSkeletons) {
      skeletonsScrollControl.scrollToBottom();
    }
  }, [showSkeletons, skeletonsScrollControl.scrollToBottom]);

  useEffect(() => {
    if (showMessagesList) {
      scrollControl.scrollToBottom();
    }
  }, [scrollControl.scrollToBottom, showMessagesList]);

  return (
    <div className="h-full">
      {showSkeletons && (
        <Scroll ref={skeletonsScrollControl.ref} height="full" scrollToBottomOnMount>
          <div className="px-6 py-6">
            <BaseMessageSkeletons />
          </div>
        </Scroll>
      )}

      {showEmptyState && (
        <div className="w-full h-full flex items-center justify-center">
          <Empty title="No messages" />
        </div>
      )}

      {showMessagesList && (
        <Scroll ref={scrollControl.ref} height="full" onScrollToTop={handleScrollToTop} onScrollToTopWithThreshold={handleScrollToTopWithThreshold}>
          <BaseMessagesList>{items}</BaseMessagesList>
        </Scroll>
      )}
    </div>
  );
};

export default MessagesList;
