import { NOTIFY_TYPING_START } from "./tags";
import { useCustomMutation } from "@/shared/lib/graphql";

const useNotifyTypingStartMutation = () => {
  return useCustomMutation(NOTIFY_TYPING_START);
};

export default useNotifyTypingStartMutation;
