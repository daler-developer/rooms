import { useAuth } from "@/modules/auth";
import { User } from "@/__generated__/graphql";
import { CREATE_ROOM } from ".";
import { useCustomMutation } from "@/shared/lib/graphql";

const useCreateRoomMutation = () => {
  const { userId } = useAuth();

  return useCustomMutation(CREATE_ROOM, {
    update(cache, { data }) {
      cache.modify<User>({
        id: cache.identify({ __typename: "User", id: userId }),
        fields: {
          rooms(prevInvitations) {
            if (!prevInvitations) {
              return prevInvitations;
            }

            return [...prevInvitations, data!.createRoom];
          },
        },
      });
    },
  });
};

export default useCreateRoomMutation;
