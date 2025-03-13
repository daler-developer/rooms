import { GET_PARTICIPANTS } from "./tags";
import { useQuery } from "@apollo/client";
import { RoomInviteMembersGetParticipantsQueryVariables } from "@/__generated__/graphql.ts";

const useGetParticipantsQuery = (variables: RoomInviteMembersGetParticipantsQueryVariables) => {
  return useQuery(GET_PARTICIPANTS, {
    variables,
  });
};

export default useGetParticipantsQuery;
