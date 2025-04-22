import { gql } from "@/__generated__";

export const ROOMS_LIST = gql(`
  query RoomsList {
    rooms {
      id
      name
      thumbnailUrl
      participantsCount
      newMessagesCount
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

export const ME_IS_EXCLUDED_FROM_ROOM = gql(`
    subscription MyRooms_MeIsExcludedFromRoomSub {
      meIsExcludedFromRoom {
        id
        name
      }
    }
`);

export const ROOM_LAST_MESSAGE_CHANGE_SUB = gql(`
  subscription RoomsListLastMessageChange($roomId: Int!) {
    roomLastMessageChange(roomId: $roomId) {
      id
      text
      sender {
        id
        firstName
        lastName
      }
    }
  }
`);

export const NEW_ROOM_SUB = gql(`
  subscription RoomsListNewRoom {
    newRoom {
      id
      name
      thumbnailUrl
      participantsCount
      newMessagesCount
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

export const NEW_MESSAGES_COUNT_CHANGE_SUB = gql(`
  subscription RoomsListNewMessagesCountChange($roomId: Int!) {
    roomNewMessagesCountChange(roomId: $roomId)
  }
`);
