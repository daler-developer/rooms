import { gql } from "@/__generated__";

export const SEND_MESSAGE_MUTATION = gql(`
  mutation RoomChatSendMessage($input: SendMessageInput!) {
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
  mutation RoomChatScheduleMessage($input: ScheduleMessage!) {
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
      images {
        id
        url
      }
    }
  }
`);

export const DELETE_MESSAGES = gql(`
  mutation RoomChatDeleteMessages($roomId: Int!, $messageIds: [Int!]!) {
    deleteMessages(roomId: $roomId, messageIds: $messageIds)
  }
`);

export const NOTIFY_TYPING_START = gql(`
  mutation RoomChatNotifyTypingStart($roomId: Int!) {
    notifyTypingStart(roomId: $roomId)
  }
`);

export const NOTIFY_TYPING_STOP = gql(`
  mutation RoomChatNotifyTypingStop($roomId: Int!) {
    notifyTypingStop(roomId: $roomId)
  }
`);

export const GET_ROOM_PARTICIPANTS_QUERY = gql(`
    query RoomChatGetRoomParticipants($id: Int!) {
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

export const ROOM_PARTICIPANT_LEAVE_SUB = gql(`
  subscription RoomChatParticipantLeave($roomId: Int!) {
    roomParticipantLeave(roomId: $roomId) {
      id
      firstName
      lastName
    }
  }
`);

export const MARK_MESSAGE_AS_VIEWS_BY_ME = gql(`
  mutation MarkMessageAsViewedByMe($messageId: Int!) {
    markMessageAsViewed(messageId: $messageId) {
      id
      viewsCount
      isViewedByMe
    }
  }
`);

export const MARK_MESSAGE_AS_VIEWED = gql(`
  mutation RoomChatMarkMessageAsViewed($messageId: Int!) {
    markMessageAsViewed(messageId: $messageId) {
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
  query RoomChatGetRoom($roomId: Int!) {
    room(id: $roomId) {
      id
      name
      creatorId
      thumbnailUrl
      pendingInvitationsCount
      participantsOnlineCount
      scheduledMessagesCount
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
          images {
            id
            url
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

export const ME_IS_EXCLUDED_FROM_ROOM = gql(`
  subscription MeIsExcludedFromRoomSub {
    meIsExcludedFromRoom {
      id
      name
    }
  }
`);

export const NEW_MESSAGE_SUB = gql(`
  subscription RoomChatNewMessage($skipFromCurrentSession: Boolean!) {
    newMessage(skipFromCurrentSession: $skipFromCurrentSession) {
      message {
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

export const USERS_ONLINE_STATUS_CHANGE = gql(`
  subscription RoomChatUsersOnlineStatusChange($userIds: [Int!]!) {
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

export const ROOM_PARTICIPANTS_ONLINE_COUNT_CHANGE_SUB = gql(`
  subscription RoomParticipantsOnlineCountChange($roomId: Int!) {
    roomParticipantsOnlineCountChange(roomId: $roomId) {
      id
      participantsOnlineCount       
    }
  }
`);

export const ROOM_PENDING_INVITATIONS_COUNT_CHANGE_SUB = gql(`
  subscription RoomChatPendingInvitationsCountChange2($roomId: Int!) {
    roomPendingInvitationsCountChange(roomId: $roomId) {
      id
      pendingInvitationsCount
    }
  }
`);

export const ROOM_PARTICIPANT_TYPING_START = gql(`
  subscription RoomChatParticipantTypingStart($roomId: Int!) {
    roomParticipantTypingStart(roomId: $roomId) {
      id
      firstName
      lastName
    }
  }
`);

export const ROOM_PARTICIPANT_TYPING_STOP = gql(`
  subscription RoomChatParticipantTypingStop($roomId: Int!) {
    roomParticipantTypingStop(roomId: $roomId) {
      id
    }
  }
`);

export const MESSAGE_VIEWS_COUNT_CHANGE_SUB = gql(`
  subscription RoomChatMessageViewsCountChange($messageId: Int!) {
    messageViewsCountChange(messageId: $messageId)
  }
`);

export const ROOM_SCHEDULED_MESSAGES_COUNT_CHANGE_SUB = gql(`
  subscription RoomChatScheduledMessagesCountChange($roomId: Int!) {
    roomScheduledMessagesCountChange(roomId: $roomId)
  }
`);
