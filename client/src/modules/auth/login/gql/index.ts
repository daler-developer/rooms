import { gql } from "@/__generated__";

export const LOGIN = gql(`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
      }
      token
    }
  }
`);
