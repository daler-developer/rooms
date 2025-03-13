import { useQuery } from "@apollo/client";
import { GET_ROOM_PARTICIPANTS_QUERY } from "./tags";
import { RoomChatGetRoomParticipantsQueryVariables } from "@/__generated__/graphql";

const useGetRoomParticipantsQuery = ({ id }: RoomChatGetRoomParticipantsQueryVariables) => {
  return useQuery(GET_ROOM_PARTICIPANTS_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: {
      id,
    },
  });
};

export default useGetRoomParticipantsQuery;
