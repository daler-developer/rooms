import { gql } from "@/__generated__";

export const SUBSCRIBE_TO_ME_INVITED_TO_ROOM = gql(`
  subscription MeIsInvitedToRoom {
    meIsInvitedToRoom {
      room {
        id
        name
      }
    }
  }
`);
