import { gql } from "@/__generated__";

export const SUBSCRIBE_TO_ME_BLOCKED_STATUS = gql(`
  subscription MeBlockedStatus {
    meIsBlockedStatus {
      isBlocked
    }
  }
`);

export const GET_ME = gql(`
  query AppGetMe {
    me {
      id
    }
  }
`);

export const START_SESSION = gql(`
  mutation StartSession {
    startSession {
      sessionToken
    }
  }
`);
