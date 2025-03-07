import { gql } from "@/__generated__";

export const SEARCH_USERS = gql(`
  query SearchUsers($filter: SearchUsersFilterInput!) {
    searchUsers(filter: $filter) {
      data {
        id
        email
        profilePictureUrl
      }
      hasMore
    }
  }
`);

export const ROOM_GET_PENDING_INVITATIONS = gql(`
  query RoomGetPendingInvitations($roomId: Int!) {
    room(id: $roomId) {
      id
      pendingInvitations {
        userId
        roomId
      }
    }
  }
`);

export const INVITE_USERS_TO_ROOM = gql(`
  mutation InviteUsersToRoom($roomId: Int!, $invitedUsersIds: [Int!]!) {
    inviteUsersToRoom(roomId: $roomId, invitedUsersIds: $invitedUsersIds)
  }
`);
