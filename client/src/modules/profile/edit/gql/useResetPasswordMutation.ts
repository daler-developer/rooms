import { useCustomMutation } from "@/shared/lib/graphql";
import { RESET_PASSWORD } from "./tags";

const useResetPasswordMutation = () => {
  return useCustomMutation(RESET_PASSWORD);
};

export default useResetPasswordMutation;
