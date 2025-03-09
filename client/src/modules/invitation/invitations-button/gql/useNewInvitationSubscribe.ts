import { useSubscription } from "@apollo/client";
import { INVITATIONS_COUNT_UPDATED_SUB } from "./tags";

const useNewInvitationSubscribe = () => {
  return useSubscription(INVITATIONS_COUNT_UPDATED_SUB);
};

export default useNewInvitationSubscribe;
