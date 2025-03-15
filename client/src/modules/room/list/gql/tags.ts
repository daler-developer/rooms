import { gql } from "@/__generated__";

export const ROOMS_LIST = gql(`
  query RoomsList {
    rooms {
      id
      name
      thumbnailUrl
      participantsCount
      unreadMessagesCount
      lastMessage {
        id
        text
        sender {
          id
          firstName
          lastName
        }
      }
    }
  }
`);

export const ROOM_PARTICIPANT_LEAVE_SUB = gql(`
  subscription RoomsListParticipantLeave($roomId: Int!) {
    roomParticipantLeave(roomId: $roomId) {
      id
      email
    }
  }
`);

export const ROOM_PARTICIPANT_JOINED_SUBSCRIPTION = gql(`
  subscription RoomParticipantJoined($roomId: Int!) {
    roomParticipantJoined(roomId: $roomId) {
      id
      email
      profilePictureUrl
    }
  }
`);

export const ME_IS_EXCLUDED_FROM_ROOM = gql(`
    subscription MyRooms_MeIsExcludedFromRoomSub {
      meIsExcludedFromRoom {
        id
        name
      }
    }
`);

export const NEW_MESSAGE_SUB = gql(`
  subscription RoomsListNewMessageSub($skipFromCurrentSession: Boolean!) {
    newMessage(skipFromCurrentSession: $skipFromCurrentSession) {
      message {
        id
        text
        roomId
        sender {
          id
          email
        }
      }
      room {
        id
        unreadMessagesCount
        lastMessage {
          id
          text
          sender {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`);

export const ROOM_CREATED_SUB = gql(`
  subscription RoomsListRoomCreated($skipFromCurrentSession: Boolean!) {
    roomCreated(skipFromCurrentSession: $skipFromCurrentSession) {
      id
      name
      thumbnailUrl
      participantsCount
      unreadMessagesCount
      lastMessage {
        id
        text
        sender {
          id
          firstName
          lastName
        }
      }
    }
  }
`);
