import { REJECT_INVITATION } from "./tags";
import { useCustomMutation } from "@/shared/lib/graphql";
import { useAuth } from "@/modules/auth";
import { Query, User } from "@/__generated__/graphql";

const useRejectInvitationMutation = () => {
  const { userId } = useAuth();

  return useCustomMutation(REJECT_INVITATION, {
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const rejectedInvitation = data.rejectInvitation;
      cache.modify<User>({
        id: cache.identify({ __typename: "User", id: userId }),
        fields: {
          invitationsCount(prevInvitationsCount) {
            return prevInvitationsCount - 1;
          },
        },
      });
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
