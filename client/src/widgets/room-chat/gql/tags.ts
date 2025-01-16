import { gql } from "@/__generated__";

export const SEND_MESSAGE_MUTATION = gql(`
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      id
      text
      senderId
      roomId
      isViewedByMe
      sender {
        id
        email
        profilePictureUrl
      }
      images {
        id
        url
      }
      viewsCount
    }
  }
`);

export const SCHEDULE_MESSAGE_MUTATION = gql(`
  mutation ScheduleMessage($input: ScheduleMessage!) {
    scheduleMessage(input: $input) {
      id
      text
      senderId
      roomId
      isViewedByMe
      sender {
        id
        email
        profilePictureUrl
      }
      images {
        id
        url
      }
      viewsCount
    }
  }
`);

export const DELETE_MESSAGES = gql(`
  mutation DeleteMessages($roomId: Int!, $messageIds: [Int!]!) {
    deleteMessages(roomId: $roomId, messageIds: $messageIds)
  }
`);

export const GET_ROOM_PARTICIPANTS_QUERY = gql(`
    query GetRoomParticipants($id: Int!) {
      room(id: $id) {
        id
        participants {
          id
          email
          profilePictureUrl
          isOnline
        }
      }
    }
`);

export const MARK_MESSAGE_AS_VIEWS_BY_ME = gql(`
  mutation MarkMessageAsViewedByMe($messageId: Int!) {
    markMessageAsViewedByMe(messageId: $messageId) {
      id
      viewsCount
      isViewedByMe
    }
  }
`);

export const GET_ME = gql(`
  query RoomChatMe($input: SendMessageInput!) {
    me {
      id
      email
    }
  }
`);

export const GET_ROOM = gql(`
  query GetRoom($roomId: Int!, $messagesOffset: Int!, $scheduledMessagesOffset: Int!) {
    room(id: $roomId) {
      id
      name
      thumbnailUrl
      pendingInvitationsCount
      participantsOnlineCount
      myScheduledMessagesCount
      messages(offset: $messagesOffset) {
        data {
          id
          text
          senderId
          roomId
          isViewedByMe
          sentAt
          sender {
            id
            email
            profilePictureUrl
            isOnline
          }
          images {
            id
            url
          }
          viewsCount
        }
        hasMore
      }
      scheduledMessages(offset: $scheduledMessagesOffset) {
        data {
          id
          text
          senderId
          roomId
          sender {
            id
            email
            profilePictureUrl
            isOnline
          }
        }
        hasMore
      }
      participantsTyping {
        id
        email
      }
    }
  }
`);

export const GET_MESSAGE_VIEWERS = gql(`
    query GetMessageViewers($messageId: Int!) {
      message(id: $messageId) {
        id
        viewers {
          id
          email
          profilePictureUrl
        }
      }
    }
`);

export const NOTIFY_ME_IS_TYPING = gql(`
    mutation NotifyMeIsTyping($roomId: Int!, $isTyping: Boolean!) {
      notifyMeTypingStatusChange(roomId: $roomId, isTyping: $isTyping)
    }
`);

export const EXCLUDE_USER_FROM_ROOM = gql(`
    mutation ExcludeUserFromRoom($roomId: Int!, $userId: Int!) {
      excludeUserFromRoom(roomId: $roomId, userId: $userId) {
        id
        name
      }
    }
`);

export const USER_TYPING_STATUS_CHANGED_SUB = gql(`
    subscription UserTypingStatusChange($roomId: Int!) {
      userTypingStatusChange(roomId: $roomId) {
        isTyping
        user {
          id
          email
        }
      }
    }
`);

export const ME_IS_EXCLUDED_FROM_ROOM = gql(`
    subscription MeIsExcludedFromRoomSub {
      meIsExcludedFromRoom {
        id
        name
      }
    }
`);

export const NEW_MESSAGE_SUB = gql(`
  subscription NewMessageSub {
    newMessage {
      message {
        id
        text
        roomId
        senderId
        scheduledAt
        sender {
          id
          email
          profilePictureUrl
        }
        images {
          id
          url
        }
      }
    }
  }
`);

export const MESSAGE_VIEWED_SUB = gql(`
  subscription MessageViewedSub($messageId: Int!) {
    messageViewed(messageId: $messageId) {
      viewer {
        id
        email
        profilePictureUrl
      }
      message {
        id
        viewsCount
      }
    }
  }
`);

export const ROOM_PENDING_INVITATIONS_COUNT_CHANGE = gql(`
  subscription RoomPendingInvitationsCountChange($roomId: Int!) {
    roomPendingInvitationsCountChange(roomId: $roomId) {
      id
      pendingInvitationsCount
    }
  }
`);

export const USERS_ONLINE_STATUS_CHANGE = gql(`
  subscription UsersOnlineStatusChange($userIds: [Int!]!) {
    usersOnlineStatusChange(userIds: $userIds) {
      id
      isOnline
    }
  }
`);

export const MESSAGES_DELETED = gql(`
  subscription MessagesDeleted($roomId: Int!) {
    messagesDeleted(roomId: $roomId) {
      messageIds
    }
  }
`);
