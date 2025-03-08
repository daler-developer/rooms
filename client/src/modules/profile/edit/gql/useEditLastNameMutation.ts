import { useCustomMutation } from "@/shared/lib/graphql";
import { EDIT_LAST_NAME } from "./tags";

const useEditLastNameMutation = () => {
  return useCustomMutation(EDIT_LAST_NAME);
};

export default useEditLastNameMutation;
