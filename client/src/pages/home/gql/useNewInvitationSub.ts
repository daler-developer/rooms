import { NEW_INVITATION_SUB } from "./tags";
import { useSubscription } from "@apollo/client";
import { useToast } from "@/shared/ui";

const useNewInvitationSub = () => {
  const toast = useToast();

  return useSubscription(NEW_INVITATION_SUB, {
    onData() {
      toast.success("New invitation to room");
    },
  });
};

export default useNewInvitationSub;
