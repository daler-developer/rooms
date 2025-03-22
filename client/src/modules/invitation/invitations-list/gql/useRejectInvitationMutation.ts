import { REJECT_INVITATION } from "./tags";
import { useCustomMutation } from "@/shared/lib/graphql";
import { Query } from "@/__generated__/graphql";
import { useAuth } from "@/modules/auth";

const useRejectInvitationMutation = () => {
  const { userId } = useAuth();

  return useCustomMutation(REJECT_INVITATION, {
    optimisticResponse(variables) {
      return {
        rejectInvitation: {
          userId,
          roomId: variables.input.roomId,
        },
      };
    },
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const rejectedInvitation = data.rejectInvitation;
      cache.modify<Query>({
        id: "ROOT_QUERY",
        fields: {
          invitations(prevInvitations, { readField }) {
            return prevInvitations.filter((_invitation) => {
              const userId = readField("userId", _invitation);
              const roomId = readField("roomId", _invitation);

              return !(userId === rejectedInvitation.userId && roomId === rejectedInvitation.roomId);
            });
          },
        },
      });
    },
  });
};

export default useRejectInvitationMutation;
