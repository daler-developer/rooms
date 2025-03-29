import { DELETE_MESSAGES } from "./tags.ts";
import { useCustomMutation } from "@/shared/lib/graphql";

const useDeleteMessagesMutation = () => {
  return useCustomMutation(DELETE_MESSAGES, {
    update() {},
  });
};

export default useDeleteMessagesMutation;
