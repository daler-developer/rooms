import { gql } from "@/__generated__";

export const SEND_MESSAGE_MUTATION = gql(`
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
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
  }
`);

export const SCHEDULE_MESSAGE_MUTATION = gql(`
  mutation ScheduleMessage($input: ScheduleMessage!) {
    scheduleMessage(input: $input) {
      id
      text
      senderId
      roomId
      scheduledAt
      sender {
        id
        email
        profilePictureUrl
        isOnline
      }
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
          firstName
          lastName
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
  query RoomChatMe {
    me {
      id
      email
      firstName
      lastName
      profilePictureUrl
    }
  }
`);

export const GET_ROOM = gql(`
  query GetRoom($roomId: Int!, $scheduledMessagesOffset: Int!) {
    room(id: $roomId) {
      id
      name
      creatorId
      thumbnailUrl
      pendingInvitationsCount
      participantsOnlineCount
      myScheduledMessagesCount
      scheduledMessages(offset: $scheduledMessagesOffset) {
        data {
          id
          text
          senderId
          roomId
          scheduledAt
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
        firstName
        lastName
      }
    }
  }
`);

export const GET_MESSAGES = gql(`
  query RoomChatGetMessages($roomId: Int!, $offset: Int!) {
    room(id: $roomId) {
      id
      messages(offset: $offset) {
        data {
          id
          text
          senderId
          roomId
          isViewedByMe
          sentAt
          sender {
            id
            firstName
            lastName
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
    }
  }
`);

export const GET_SCHEDULED_MESSAGES = gql(`
  query RoomChatGetScheduledMessages($roomId: Int!, $offset: Int!) {
    room(id: $roomId) {
      id
      scheduledMessages(offset: $offset) {
        data {
          id
          text
          senderId
          roomId
          scheduledAt
          sender {
            id
            email
            profilePictureUrl
            isOnline
          }
        }
        hasMore
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
    mutation RoomChatExcludeFrom($roomId: Int!, $userId: Int!) {
      excludeUserFromRoom(roomId: $roomId, userId: $userId) {
        id
        name
      }
    }
`);

export const SEND_SCHEDULED_MESSAGES_NOW = gql(`
  mutation RoomChatSendScheduledMessagesNow($messageIds: [Int!]!) {
    sendScheduledMessagesNow(messageIds: $messageIds)
  }
`);

export const USER_TYPING_STATUS_CHANGED_SUB = gql(`
    subscription UserTypingStatusChange($roomId: Int!) {
      userTypingStatusChange(roomId: $roomId) {
        isTyping
        user {
          id
          firstName
          lastName
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
  subscription NewMessageSub($skipFromCurrentSession: Boolean!) {
    newMessage(skipFromCurrentSession: $skipFromCurrentSession) {
      message {
        id
        text
        senderId
        roomId
        scheduledAt
        sender {
          id
          email
          profilePictureUrl
          isOnline
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
