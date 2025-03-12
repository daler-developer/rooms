import { useSubscription } from "@apollo/client";
import { Query } from "@/__generated__/graphql";
import { ME_IS_EXCLUDED_FROM_ROOM } from "./tags";

const useExcludedFromSub = () => {
  return useSubscription(ME_IS_EXCLUDED_FROM_ROOM, {
    onData({ data, client }) {
      client.cache.modify<Query>({
        id: "ROOT_QUERY",
        fields: {
          rooms(prevRooms) {},
        },
      });
      client.cache.evict({ id: client.cache.identify({ id: data.data!.meIsExcludedFromRoom.id, __typename: "Room" }) });
    },
  });
};

export default useExcludedFromSub;
