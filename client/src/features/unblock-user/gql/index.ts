import { gql } from "@/__generated__";

const UNBLOCK_USER = gql(`
  mutation UnblockUser($input: UnblockUserInput!) {
    unblockUser(input: $input) {
      id
      isBlocked
    }
  }
`);

export { UNBLOCK_USER };
