import { gql } from "@/__generated__";

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

export const EXCLUDE_USER_FROM_ROOM = gql(`
    mutation RoomChatExcludeUserFromRoom($roomId: Int!, $userId: Int!) {
      excludeUserFromRoom(roomId: $roomId, userId: $userId) {
        id
        name
      }
    }
`);

export const PARTICIPANT_JOINED = gql(`
    subscription RoomChatParticipantJoined($roomId: Int!) {
      roomParticipantJoined(roomId: $roomId) {
        id
        firstName
        lastName
        profilePictureUrl
        isOnline
      }
    }
`);
