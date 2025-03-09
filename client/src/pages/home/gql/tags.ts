import { gql } from "@/__generated__";

export const NEW_INVITATION_SUB = gql(`
  subscription HomeNewInvitation {
    newInvitation {
      userId
      roomId
    }
  }
`);

export const USER_REJECTED_INVITATION_SUB = gql(`
  subscription HomeUserRejectedInvitation {
    invitationRejected {
      userId
      roomId
      room {
        id
        name
      }
      invitedUser {
        id
        firstName
        lastName
      }
    }
  }
`);

export const USER_ACCEPTED_INVITATION_SUB = gql(`
  subscription HomeUserAcceptedInvitation {
    invitationAccepted {
      userId
      roomId
      room {
        id
        name
      }
      invitedUser {
        id
        firstName
        lastName
      }
    }
  }
`);
