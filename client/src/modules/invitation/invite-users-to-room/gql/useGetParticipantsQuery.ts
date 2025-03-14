import { GET_PARTICIPANTS } from "./tags";
import { RoomInviteMembersGetParticipantsQueryVariables } from "@/__generated__/graphql.ts";
import { useCustomLazyQuery } from "@/shared/lib/graphql";

const useGetParticipantsQuery = (variables: RoomInviteMembersGetParticipantsQueryVariables) => {
  return useCustomLazyQuery(GET_PARTICIPANTS, {
    variables,
  });
};

export default useGetParticipantsQuery;
