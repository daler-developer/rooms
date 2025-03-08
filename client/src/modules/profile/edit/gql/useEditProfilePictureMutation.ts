import { useCustomMutation } from "@/shared/lib/graphql";
import { EDIT_PROFILE_PICTURE } from "./tags";

const useEditProfilePictureMutation = () => {
  return useCustomMutation(EDIT_PROFILE_PICTURE);
};

export default useEditProfilePictureMutation;
