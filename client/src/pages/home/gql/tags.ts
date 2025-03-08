import { gql } from "@/__generated__";

export const NEW_INVITATION_SUB = gql(`
  subscription HomeNewInvitation {
    newInvitation {
      userId
      roomId
    }
  }
`);
