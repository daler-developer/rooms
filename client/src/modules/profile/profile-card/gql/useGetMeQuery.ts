import { useQuery } from "@apollo/client";
import { GET_ME, USER_PROFILE_UPDATED_SUB } from "./tags";
import { useEffect } from "react";
import { useAuth } from "@/modules/auth";

const useGetMeQuery = () => {
  const { userId } = useAuth();

  const query = useQuery(GET_ME, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (query.data) {
      const unsubscribe = query.subscribeToMore({
        document: USER_PROFILE_UPDATED_SUB,
        variables: {
          userId: userId!,
        },
        updateQuery(prev, { subscriptionData }) {
          if (!subscriptionData.data) return prev;

          const updatedFields = subscriptionData.data.userProfileUpdated;

          return Object.assign({}, prev, {
            me: {
              ...prev.me,
              ...updatedFields,
            },
          });
        },
      });

      return () => {
        unsubscribe();
      };
    }
  }, [query.data, query.subscribeToMore, userId]);

  return query;
};

export default useGetMeQuery;
