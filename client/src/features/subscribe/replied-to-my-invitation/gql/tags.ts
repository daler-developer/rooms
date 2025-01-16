import { gql } from "@/__generated__";

export const SUBSCRIBE_TO_REPLIED_TO_MY_INVITATION = gql(`
  subscription RepliedToMyInvitation {
    repliedToMyInvitation {
      accepted
      invitation {
        userId
        roomId
        invitedUser {
          id
          email
        }
        room {
          id
          name
        }
      }
    }
  }
`);
