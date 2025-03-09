import { USER_ACCEPTED_INVITATION_SUB } from "./tags";
import { useSubscription } from "@apollo/client";
import { useToast } from "@/shared/ui";

const useNewInvitationSub = () => {
  const toast = useToast();

  return useSubscription(USER_ACCEPTED_INVITATION_SUB, {
    onData({ data }) {
      if (!data.data) {
        return;
      }
      const invitation = data.data.invitationAccepted;
      toast.success(`${invitation.invitedUser.firstName} ${invitation.invitedUser.lastName} accepted your invitation to room "${invitation.room.name}"`);
    },
  });
};

export default useNewInvitationSub;
