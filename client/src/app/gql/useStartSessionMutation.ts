import { useCustomMutation } from "@/shared/lib/graphql";
import { START_SESSION } from ".";

const useStartSessionMutation = () => {
  return useCustomMutation(START_SESSION);
};

export default useStartSessionMutation;
