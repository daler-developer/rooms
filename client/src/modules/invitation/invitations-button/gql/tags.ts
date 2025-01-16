import { gql } from "@/__generated__";

export const GET_ME = gql(`
  query InvitationsButtonGetMe {
    me {
      id
      invitationsCount
    }
  }
`);

export const SUBSCRIBE_TO_ME_INVITED_TO_ROOM = gql(`
  subscription InvitationsButtonMeInvitedToRoomSub {
    meIsInvitedToRoom {
      invitation {
        userId
        roomId
      }
    }
  }
`);
