import { gql } from "@/__generated__";

const SEARCH_USERS = gql(`
  query SearchUsers($input: SearchUsersInput!) {
    searchUsers(input: $input) {
      users {
        id
        email
        profilePictureUrl
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
      creatorId
    }
  }
`);

const SUBSCRIBE_TO_USER_ONLINE_STATUS_CHANGE = gql(`
  subscription SubscribeToUserOnlineStatusChange($input: UserOnlineStatusChangeSubscriptionInput!) {
    userOnlineStatusChange(input: $input) {
      isOnline
    }
  }
`);

export { SEARCH_USERS, CREATE_ROOM, SUBSCRIBE_TO_USER_ONLINE_STATUS_CHANGE };
