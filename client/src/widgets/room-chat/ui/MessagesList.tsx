import { NetworkStatus, useQuery, useSubscription } from "@apollo/client";
import { GET_ROOM, NEW_MESSAGE_SUB, MESSAGES_DELETED } from "@/widgets/room-chat/gql/tags.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import Message from "./Message/Message.tsx";
import { Scroll, Spinner } from "@/shared/ui";
import TemporaryMessage from "./Message/TemporaryMessage.tsx";
import { useKeyboard } from "@/shared/hooks";
import useRoomQuery from "@/widgets/room-chat/hooks/useRoomQuery.ts";
import BaseMessagesList from "@/widgets/room-chat/ui/base/BaseMessagesList.tsx";
import { useRef, ElementRef, useState, useEffect } from "react";

const MessagesList = () => {
  const { roomId, temporaryMessages, clearSelectedMessages, messagesListScrollableEl, setMessagesListScrollableEl } = useRoomChatStore();

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

      client.cache.modify({
        id: client.cache.identify({ __typename: "Room", id: roomId }),
        fields: {
          messages(existingData) {
            return {
              data: [newMessage, ...existingData.data],
              hasMore: existingData.hasMore,
            };
          },
        },
      });
    },
  });

  const { data, fetchMore, networkStatus } = useRoomQuery();

  useKeyboard({
    Escape: () => {
      clearSelectedMessages();
    },
  });

  // useEffect(() => {
  //   messagesListScrollHandler?.scrollToBottom();
  // }, [messagesListScrollHandler, data!.room.messages.data.length]);

  const isRefetching = networkStatus === NetworkStatus.fetchMore;

  const fetchMoreMessages = async () => {
    if (!isRefetching && data!.room.messages.hasMore) {
      await fetchMore({
        variables: {
          messagesOffset: data!.room.messages.data.length,
        },
      });
    }
  };

  const handleScrollToTop = async () => {
    await fetchMoreMessages();
  };

  const handleReachTopThreshhold = async () => {
    await fetchMoreMessages();
  };

  const scrollableEl = useRef<HTMLElement>(null!);

  return (
    <BaseMessagesList
      ref={(arg) => {
        if (arg) {
          scrollableEl.current = arg.scrollableEl;
        }
      }}
      onScrollToTop={handleScrollToTop}
      onReachTopThreshold={handleReachTopThreshhold}
      showSpinner={isRefetching}
    >
      {[...data!.room.messages.data].reverse().map((message) => (
        <Message key={message.id} message={message} intersectionAnchor={scrollableEl} />
      ))}
      {temporaryMessages.map((temporaryMessage) => (
        <TemporaryMessage key={temporaryMessage.temporaryId} temporaryMessage={temporaryMessage} />
      ))}
    </BaseMessagesList>
  );

  // return (
  //   <Scroll
  //     className="flex-grow"
  //     height={500}
  //     ref={(el) => {
  //       if (el && !messagesListScrollHandler) {
  //         setMessagesListScrollHandler(el);
  //       }
  //       // if (!messagesListEl && el) {
  //       //   setMessagesListEl(el);
  //       // }
  //     }}
  //     onScrollToTop={handleScrollToTop}
  //     onReachTopThreshold={handleReachTopThreshhold}
  //     topThreshold={200}
  //     scrollToBottomOnMount
  //   >
  //     <div className="pt-4 pb-4">
  //       {!data?.room.messages.hasMore && (
  //         <div className="flex justify-center pb-4">
  //           <h1>Room Created</h1>
  //         </div>
  //       )}
  //
  //       {isRefetching && (
  //         <div className="flex justify-center pb-4">
  //           <Spinner size="lg" />
  //         </div>
  //       )}
  //
  //       <ul className="flex flex-col gap-2">
  //         {[...data!.room.messages.data].reverse().map((message) => (
  //           <Message message={message} key={message.id} />
  //         ))}
  //         {temporaryMessages.map((temporaryMessage) => (
  //           <TemporaryMessage key={temporaryMessage.temporaryId} temporaryMessage={temporaryMessage} />
  //         ))}
  //       </ul>
  //     </div>
  //   </Scroll>
  // );
};

export default MessagesList;
