import { gql } from "@/__generated__";

const SUBSCRIBE_TO_ME_BLOCKED_STATUS = gql(`
  subscription MeBlockedStatus {
    meIsBlockedStatus {
      isBlocked
    }
  }
`);

export { SUBSCRIBE_TO_ME_BLOCKED_STATUS };
