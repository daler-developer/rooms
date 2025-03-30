import { useCustomMutation } from "@/shared/lib/graphql";
import { NOTIFY_TYPING_STOP } from "@/modules/room/chat/gql/tags.ts";

const useNotifyTypingStopMutation = () => {
  return useCustomMutation(NOTIFY_TYPING_STOP);
};

export default useNotifyTypingStopMutation;
