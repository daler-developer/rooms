import { gql } from "@/__generated__";

const RESET_PASSWORD = gql(`
  mutation AuthResetPassword($input: EditMyPasswordInput!) {
    editMyPassword(input: $input) {
      id
      passwordLength
    }
  }
`);

export { RESET_PASSWORD };
