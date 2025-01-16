import { gql } from "@/__generated__";

const BLOCK_USER = gql(`
  mutation BlockUser($input: BlockUserInput!) {
    blockUser(input: $input) {
      id
      email
      isBlocked
    }
  }
`);

const SUBSCRIBE_TO_ME_BLOCKED_STATUS = gql(`
  subscription MeBlockedStatus {
    meIsBlockedStatus {
      isBlocked
    }
  }
`);

export { BLOCK_USER, SUBSCRIBE_TO_ME_BLOCKED_STATUS };
