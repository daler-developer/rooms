import { gql } from "@/__generated__";

export const NEW_MESSAGE_SUBSCRIPTION = gql(`
  subscription NewMessageSubscription($skipFromCurrentSession: Boolean!) {
    newMessage(skipFromCurrentSession: $skipFromCurrentSession) {
      message {
        id
        text
        roomId
        senderId
      }
    }
  }
`);
