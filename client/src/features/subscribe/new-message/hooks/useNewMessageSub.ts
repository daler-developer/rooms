import { useSubscription } from "@apollo/client";
import { NEW_MESSAGE_SUBSCRIPTION } from "../gql/tags.ts";

const useNewMessageSub = () => {
  useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    onData({ data }) {
      console.log("data", data.data!.newMessage);
    },
  });
};

export default useNewMessageSub;
