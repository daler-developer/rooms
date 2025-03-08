import { useCustomMutation } from "@/shared/lib/graphql";
import { EDIT_FIRST_NAME } from "./tags";

const useEditFirstNameMutation = () => {
  return useCustomMutation(EDIT_FIRST_NAME);
};

export default useEditFirstNameMutation;
