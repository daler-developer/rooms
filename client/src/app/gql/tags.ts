import { gql } from "@/__generated__";

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
