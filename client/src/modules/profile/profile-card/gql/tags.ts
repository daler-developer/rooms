import { gql } from "@/__generated__";

export const GET_ME = gql(`
  query ProfileCardGetMe {
    me {
      id
      firstName
      lastName
      profilePictureUrl
    }
  }
`);

export const USER_PROFILE_UPDATED_SUB = gql(`
  subscription UserProfileUpdated($userId: Int!) {
    userProfileUpdated(userId: $userId) {
      id
      firstName
      lastName
      profilePictureUrl
    }
  }
`);
