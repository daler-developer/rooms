import { useMutation, useLazyQuery, TypedDocumentNode, MutationHookOptions, LazyQueryHookOptions, OperationVariables } from "@apollo/client";

export const useCustomMutation = <TResult, TVariables>(tag: TypedDocumentNode<TResult, TVariables>, options?: MutationHookOptions<TResult, TVariables>) => {
  const [mutate, result] = useMutation(tag, options);

  return {
    mutate,
    ...result,
  };
};

export const useCustomLazyQuery = <T, V extends OperationVariables>(tag: TypedDocumentNode<T, V>, options?: LazyQueryHookOptions<T, V>) => {
  const [fetch, result] = useLazyQuery(tag, options);

  return {
    ...result,
    fetch,
  };
};
