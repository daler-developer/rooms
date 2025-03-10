import { useCustomMutation } from "@/shared/lib/graphql";
import { START_SESSION } from "./tags";

const useStartSessionMutation = () => {
  return useCustomMutation(START_SESSION);
};

export default useStartSessionMutation;
