import { useCustomMutation } from "@/shared/lib/graphql";
import { INVITE_USERS_TO_ROOM } from "./tags";

const useInviteUsersToRoomMutation = () => {
  return useCustomMutation(INVITE_USERS_TO_ROOM);
};

export default useInviteUsersToRoomMutation;
