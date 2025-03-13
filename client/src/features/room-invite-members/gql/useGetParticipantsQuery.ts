import { useCustomMutation } from "@/shared/lib/graphql";
import { GET_PARTICIPANTS } from "./tags";

const useGetParticipantsQuery = () => {
  return useCustomMutation(GET_PARTICIPANTS);
};

export default useGetParticipantsQuery;
