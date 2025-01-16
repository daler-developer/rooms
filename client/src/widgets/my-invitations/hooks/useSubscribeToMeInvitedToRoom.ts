import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_TO_ME_INVITED_TO_ROOM } from "../gql/tags.ts";

const useSubscribeToMeInvitedToRoom = () => {
  useSubscription(SUBSCRIBE_TO_ME_INVITED_TO_ROOM, {
    onData() {},
  });
};

export default useSubscribeToMeInvitedToRoom;
