import { useSubscription } from "@apollo/client";
import { USERS_ONLINE_STATUS_CHANGE } from "./tags";
import { UsersSelectorOnlineStatusChangeSubscriptionVariables } from "@/__generated__/graphql.ts";

const useUsersOnlineStatusChangeSub = (variables: UsersSelectorOnlineStatusChangeSubscriptionVariables) => {
  return useSubscription(USERS_ONLINE_STATUS_CHANGE, {
    variables,
    skip: variables.userIds.length === 0,
  });
};

export default useUsersOnlineStatusChangeSub;
