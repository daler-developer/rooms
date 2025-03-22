import { ACCEPT_INVITATION } from "./tags";
import { useCustomMutation } from "@/shared/lib/graphql";
import { Query } from "@/__generated__/graphql";
import { useAuth } from "@/modules/auth";

const useAcceptInvitationMutation = () => {
  const { userId } = useAuth();

  return useCustomMutation(ACCEPT_INVITATION, {
    optimisticResponse(variables) {
      return {
        acceptInvitation: {
          userId,
          roomId: variables.input.roomId,
        },
      };
    },
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const newInvitation = data.acceptInvitation;
      cache.modify<Query>({
        id: "ROOT_QUERY",
        fields: {
          invitations(prevInvitations, { readField }) {
            return prevInvitations.filter((_invitation) => {
              const userId = readField("userId", _invitation);
              const roomId = readField("roomId", _invitation);

              return !(userId === newInvitation.userId && roomId === newInvitation.roomId);
            });
          },
        },
      });
    },
  });
};

export default useAcceptInvitationMutation;
