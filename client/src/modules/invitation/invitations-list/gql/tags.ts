import { gql } from "@/__generated__";

export const GET_INVITATIONS_LIST = gql(`
  query InvitationsList {
    invitations {
      userId
      roomId
      room {
        id
        name
        thumbnailUrl
      }
      inviter {
        id
        firstName
        lastName
      }
      createdAt
    }
  }
`);

export const ACCEPT_INVITATION = gql(`
  mutation InvitationsListAcceptInvitation($input: AcceptInvitationInput!) {
    acceptInvitation(input: $input) {
      userId
      roomId
    }
  }
`);

export const REJECT_INVITATION = gql(`
  mutation InvitationsListRejectInvitation($input: RejectInvitationInput!) {
    rejectInvitation(input: $input) {
      userId
      roomId
    }
  }
`);

export const SUBSCRIBE_TO_ME_INVITED_TO_ROOM = gql(`
  subscription InvitationsNewInvitationSub {
    newInvitation {
      userId
      roomId
      room {
        id
        name
        thumbnailUrl
      }
      inviter {
        id
        firstName
        lastName
      }
      createdAt
    }
  }
`);
