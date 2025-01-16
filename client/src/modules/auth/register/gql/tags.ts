import { gql } from "@/__generated__";

export const REGISTER = gql(`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        email
        firstName
        lastName
      }
      token
    }
  }
`);
