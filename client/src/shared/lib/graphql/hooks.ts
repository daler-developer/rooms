import { useMutation } from "@apollo/client";

export const useCustomMutation = (mutation, options) => {
  const [mutate, result] = useMutation(mutation, options);

  return {
    mutate,
    ...result,
  };
};
