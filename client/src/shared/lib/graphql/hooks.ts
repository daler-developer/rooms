import { useMutation, useLazyQuery, TypedDocumentNode, MutationHookOptions } from "@apollo/client";

export const useCustomMutation = <TResult, TVariables>(tag: TypedDocumentNode<TResult, TVariables>, options?: MutationHookOptions<TResult, TVariables>) => {
  const [mutate, result] = useMutation(tag, options);

  return {
    mutate,
    ...result,
  };
};

export const useCustomLazyQuery = <T, V>(tag: TypedDocumentNode<T, V>) => {
  const [fetch, options] = useLazyQuery(tag);

  return {
    ...options,
    fetch,
  };
};
