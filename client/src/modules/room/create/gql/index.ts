import { gql } from "@/__generated__";

const SEARCH_USERS = gql(`
  query CreateRoomSearchUsers($filter: SearchUsersFilterInput!) {
    searchUsers(filter: $filter) {
      data {
        id
        email
        firstName
        lastName
        profilePictureUrl
        isOnline
      }
      hasMore
    }
  }
`);

const CREATE_ROOM = gql(`
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
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

const USERS_ONLINE_STATUS_CHANGE = gql(`
  subscription CreateRoomUsersOnlineStatusChange($userIds: [Int!]!) {
    usersOnlineStatusChange(userIds: $userIds) {
      id
      isOnline
    }
  }
`);

export { SEARCH_USERS, CREATE_ROOM, USERS_ONLINE_STATUS_CHANGE };
