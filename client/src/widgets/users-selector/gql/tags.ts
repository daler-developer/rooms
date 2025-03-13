import { gql } from "@/__generated__";

const SEARCH_USERS = gql(`
  query UsersSelectorSearchUsers($filter: SearchUsersFilterInput!) {
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

const USERS_ONLINE_STATUS_CHANGE = gql(`
  subscription UsersSelectorOnlineStatusChange($userIds: [Int!]!) {
    usersOnlineStatusChange(userIds: $userIds) {
      id
      isOnline
    }
  }
`);

export { SEARCH_USERS, USERS_ONLINE_STATUS_CHANGE };
