import { gql } from "@/__generated__";

export const GET_MY_INVITATIONS = gql(`
  query GetMyInvitations {
    me {
      id
      invitations {
        userId
        roomId
        room {
          id
          name
        }
        inviter {
          id
          email
        }
        createdAt
      }
    }
  }
`);

export const ACCEPT_INVITATION = gql(`
  mutation AcceptInvitation($input: AcceptInvitationInput!) {
    acceptInvitation(input: $input)
  }
`);

export const REJECT_INVITATION = gql(`
  mutation RejectInvitation($input: RejectInvitationInput!) {
    rejectInvitation(input: $input)
  }
`);

// TODO: fix
export const SUBSCRIBE_TO_ME_INVITED_TO_ROOM = gql(`
  subscription MeIsInvitedToRoom2 {
    meIsInvitedToRoom {
      invitation {
        userId
        roomId
        room {
          id
          name
        }
        inviter {
          id
          email
        }
        createdAt
      }
    }
  }
`);
