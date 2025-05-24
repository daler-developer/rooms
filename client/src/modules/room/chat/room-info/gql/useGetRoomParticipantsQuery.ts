import { useQuery } from "@apollo/client";
import { GET_ROOM_PARTICIPANTS_QUERY } from "./tags";
import { RoomChatGetRoomParticipantsQueryVariables } from "@/__generated__/graphql";

const useGetRoomParticipantsQuery = (variables: RoomChatGetRoomParticipantsQueryVariables) => {
  return useQuery(GET_ROOM_PARTICIPANTS_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables,
  });
};

export default useGetRoomParticipantsQuery;
