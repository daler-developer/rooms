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
