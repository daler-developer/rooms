import { gql } from "@/__generated__";

const GET_ME = gql(`
  query GetMe {
    me {
      id
      email
      password
      profilePictureUrl
      invitationsCount
    }
  }
`);

export { GET_ME };
