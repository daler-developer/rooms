import { type RoomChatGetMessagesQuery } from "@/__generated__/graphql.ts";
import { Avatar, ContextMenu, IconButton, MouseDownMove } from "@/shared/ui";
import { useApolloClient, useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_ME } from "@/entities/user";
import MessageImages from "@/widgets/room-chat/ui/MessageImages.tsx";
import clsx from "clsx";
import MessageViews from "@/widgets/room-chat/ui/Message/MessageViews.tsx";
import { MARK_MESSAGE_AS_VIEWS_BY_ME, MESSAGE_VIEWED_SUB, USERS_ONLINE_STATUS_CHANGE } from "../../gql/tags.ts";
import { RefObject, SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { TemporaryMessage } from "@/widgets/room-chat/store";
import { SUBSCRIBE_TO_USER_ONLINE_STATUS_CHANGE } from "@/features/create-room/gql";
import BaseMessage from "@/widgets/room-chat/ui/base/BaseMessage.tsx";
import dayjs from "dayjs";
import useRoomQuery from "@/widgets/room-chat/hooks/useRoomQuery.ts";
import { emitter } from "@/global/event-emitter";
import { useAuth } from "@/modules/auth";
import useDeleteMessagesMutation from "../../gql/useDeleteMessagesMutation.ts";
import BaseSentAt from "@/widgets/room-chat/ui/base/BaseSentAt.tsx";

type Props = {
  message: Flatten<RoomChatGetMessagesQuery["room"]["messages"]["data"]>;
  intersectionAnchor: RefObject<HTMLElement>;
};

const Message = ({ message }: Props) => {
  const { selectedMessages, addSelectedMessage, removeSelectedMessage, roomId } = useRoomChatStore();

  const { data: roomData } = useRoomQuery();

  const [deleteMessages] = useDeleteMessagesMutation();

  useSubscription(USERS_ONLINE_STATUS_CHANGE, {
    variables: {
      userIds: [message.sender.id],
    },
  });

  const { userId } = useAuth();

  const [markMessageAsViewsByMe] = useMutation(MARK_MESSAGE_AS_VIEWS_BY_ME, {
    variables: {
      messageId: message.id,
    },
  });

  const isSentByMe = userId === message.sender.id;
  const isSelected = selectedMessages.includes(message.id);

  useEffect(() => {
    if (!message.isViewedByMe && !isSentByMe) {
      emitter.emit("MESSAGES_IS_VIEWED", { roomId: roomData!.room.id });
      markMessageAsViewsByMe();
    }
  }, [message, isSentByMe]);

  const contextMenuItems = [
    {
      label: "Select",
      onClick() {
        addSelectedMessage(message.id);
      },
    },
    {
      label: "Delete",
      async onClick() {
        await deleteMessages({ roomId, messageIds: [message.id] });
      },
    },
  ];

  const handleIntersect = async () => {
    // if (!message.isViewedByMe && !isSentByMe) {
    //   apolloClient.cache.modify({
    //     id: apolloClient.cache.identify(message),
    //     fields: {
    //       isViewedByMe() {
    //         return true;
    //       },
    //       viewsCount(prevCount: number) {
    //         return prevCount + 1;
    //       },
    //     },
    //   });
    //   await markMessageAsViewsByMe();
    // }
  };

  return (
    <BaseMessage
      isSelected={isSelected}
      contextMenuItems={contextMenuItems}
      isInSelectMode={selectedMessages.length > 0}
      onSelect={() => {
        addSelectedMessage(message.id);
      }}
      onDeselect={() => {
        removeSelectedMessage(message.id);
      }}
      onIntersect={handleIntersect}
      senderIsMe={isSentByMe}
      senderProfilePictureUrl={message.sender.profilePictureUrl}
      senderIsOnline={message.sender.isOnline}
      senderFirstName={message.sender.firstName}
      senderLastName={message.sender.lastName}
      viewsCount={message.viewsCount}
      sentAt={message.sentAt!}
      renderViewsCount={(content) => <MessageViews trigger={content} message={message} />}
      imageUrls={[]}
    >
      <div>
        <MessageImages images={message.images} />
        <div>{message.text}</div>
      </div>
    </BaseMessage>
  );
};

export default Message;

// return (
//   <ContextMenu
//     items={[
//       {
//         label: "Select",
//         onClick: handleSelect,
//       },
//     ]}
//     onShow={() => setShow(true)}
//     onHide={() => setShow(false)}
//   >
//     <MouseDownMove
//       onMouseDownMove={() => {
//         if (hasSelectedMessages) {
//           addSelectedMessage(message.id);
//         }
//       }}
//     >
//       <div className={containerElClasses} onClick={handleClick}>
//         <HiOutlineCheckCircle className={checkIconClasses} />
//         <div ref={rootElRef} className={messageElClasses}>
//           <div className={messageBodyClasses}>
//             <MessageImages images={message.images} />
//             <p>{message.text}</p>
//             {/*<MessageViews message={message} />*/}
//           </div>
//           <Avatar src={message.sender.profilePictureUrl || ""} size="sm" withBadge />
//         </div>
//       </div>
//     </MouseDownMove>
//   </ContextMenu>
// );

// const hasSelectedMessages = selectedMessages.length > 0;

// const handleSelect = () => {
//   addSelectedMessage(message.id);
// };

// const handleDeselect = () => {
//   removeSelectedMessage(message.id);
// };

// const handleClick = () => {
//   if (hasSelectedMessages) {
//     if (isSelected) {
//       removeSelectedMessage(message.id);
//     } else {
//       addSelectedMessage(message.id);
//     }
//   }
// };

// const messageElClasses = clsx("flex items-start select-none", {
//   "ml-auto gap-2": isSentByMe,
//   "gap-2 flex-row-reverse": !isSentByMe,
// });
//
// const containerElClasses = clsx("flex gap-2 pl-6 pr-6 rounded-md", {
//   "": isSentByMe,
//   "": !isSentByMe,
//   "bg-black bg-opacity-[0.2]": isSelected || show,
// });

// const messageBodyClasses = clsx("items-start min-w-[150px]", {
//   "flex flex-col bg-indigo-500 text-white rounded-lg p-3": isSentByMe,
//   "flex flex-col bg-white rounded-lg p-3": !isSentByMe,
// });

// const checkIconClasses = clsx("text-[35px]", {
//   invisible: !isSelected,
// });

// useSubscription(MESSAGE_VIEWED_SUB, {
//   variables: {
//     messageId: message.id,
//   },
// });

// useEffect(() => {
//   let observer: IntersectionObserver | null;
//
//   const isSentByMe = message.sender.id === data!.me.id;
//
//   if (!isSentByMe) {
//     observer = new IntersectionObserver(
//       async (entries) => {
//         for (const entry of entries) {
//           if (entry.isIntersecting) {
//             if (!message.isViewedByMe) {
//               await markMessageAsViewsByMe({
//                 variables: {
//                   messageId: message.id,
//                 },
//               });
//             }
//           }
//         }
//       },
//       {
//         root: messagesListEl,
//         threshold: 1,
//         rootMargin: "0px",
//       },
//     );
//
//     observer.observe(rootElRef.current);
//   }
//
//   return () => {
//     if (observer) {
//       observer.disconnect();
//     }
//   };
// }, [message.text]);
