import { gql } from "@/__generated__";

export const GET_ME = gql(`
  query InvitationsButtonGetMe {
    me {
      id
      invitationsCount
    }
  }
`);

export const NEW_INVITATION_SUB = gql(`
  subscription InvitationsButtonNewInvitation {
    newInvitation {
      userId
      roomId
    }
  }
`);
