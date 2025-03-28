import { gql } from "@/__generated__";

export const GET_PARTICIPANTS = gql(`
  query RoomInviteMembersGetParticipants($roomId: Int!) {
    room(id: $roomId) {
      id
      participants {
        id
      }
    }
  }
`);

export const GET_INVITED_USERS = gql(`
  query RoomInviteMembersGetInvitedUsers($roomId: Int!) {
    room(id: $roomId) {
      id
      invitedUsers {
        id
      }
    }
  }
`);

export const INVITE_USERS_TO_ROOM = gql(`
  mutation InviteUsersToRoom($roomId: Int!, $invitedUsersIds: [Int!]!) {
    inviteUsersToRoom(roomId: $roomId, invitedUsersIds: $invitedUsersIds)
  }
`);
