import { useSubscription } from "@apollo/client";
import { USERS_ONLINE_STATUS_CHANGE } from "./tags";
import { RoomChatUsersOnlineStatusChangeSubscriptionVariables } from "@/__generated__/graphql";

const useUserOnlineStatusChangeSub = ({ userIds }: RoomChatUsersOnlineStatusChangeSubscriptionVariables) => {
  useSubscription(USERS_ONLINE_STATUS_CHANGE, {
    variables: {
      userIds,
    },
    skip: userIds.length === 0,
  });
};

export default useUserOnlineStatusChangeSub;
