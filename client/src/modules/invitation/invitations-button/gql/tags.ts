import { gql } from "@/__generated__";

export const GET_INVITATIONS_COUNT = gql(`
  query InvitationsButtonGetMe {
    invitationsCount
  }
`);

export const INVITATIONS_COUNT_UPDATED_SUB = gql(`
  subscription InvitationsCountUpdatedSub {
    invitationCountUpdated
  }
`);
