import { gql } from "@/__generated__";

export const GET_ME = gql(`
  query InvitationsButtonGetMe {
    me {
      id
      invitationsCount
    }
  }
`);

export const INVITATIONS_COUNT_UPDATED_SUB = gql(`
  subscription InvitationsCountUpdatedSub {
    invitationCountUpdated {
      id
      invitationsCount
    }
  }
`);
