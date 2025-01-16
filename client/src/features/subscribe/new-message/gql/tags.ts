import { gql } from "@/__generated__";

export const NEW_MESSAGE_SUBSCRIPTION = gql(`
  subscription NewMessageSubscription {
    newMessage {
      message {
        id
        text
        roomId
        senderId
      }
    }
  }
`);
