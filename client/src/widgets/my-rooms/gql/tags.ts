import { gql } from "@/__generated__";

export const GET_MY_ROOMS = gql(`
  query GetMyRooms {
    me {
      id
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
  }
`);

export const ROOM_PARTICIPANT_LEFT_SUBSCRIPTION = gql(`
  subscription RoomParticipantLeft($roomId: Int!) {
    roomParticipantLeft(roomId: $roomId) {
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
  subscription MyRoomsNewMessageSub {
    newMessage {
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
            email
          }
        }
      }
    }
  }
`);
