import { useQuery } from "@apollo/client";
import { GET_ROOM_PARTICIPANTS_QUERY } from "./tags";
import
import { RoomChatGetRoomParticipantsQueryVariables } from "@/__generated__/graphql";

const useGetRoomParticipantsQuery = ({ id }: RoomChatGetRoomParticipantsQueryVariables) => {
  const query = useQuery(GET_ROOM_PARTICIPANTS_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: {
      id,
    },
  });

  return query;
};

export default useGetRoomParticipantsQuery;
