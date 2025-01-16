import { gql } from "@/__generated__";

const GET_USERS = gql(`
  query GetUsers {
    users {
      id
      email
      isBlocked
    }
  }
`);

export { GET_USERS };
