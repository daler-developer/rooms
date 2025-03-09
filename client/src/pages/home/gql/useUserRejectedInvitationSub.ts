import { USER_REJECTED_INVITATION_SUB } from "./tags";
import { useSubscription } from "@apollo/client";
import { useToast } from "@/shared/ui";

const useNewInvitationSub = () => {
  const toast = useToast();

  return useSubscription(USER_REJECTED_INVITATION_SUB, {
    onData({ data }) {
      if (!data.data) {
        return;
      }
      const invitation = data.data.invitationRejected;
      toast.warning(`${invitation.invitedUser.firstName} ${invitation.invitedUser.lastName} rejected your invitation to room "${invitation.room.name}"`);
    },
  });
};

export default useNewInvitationSub;
