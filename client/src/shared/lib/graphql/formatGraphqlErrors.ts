import { GraphQLErrors } from "@apollo/client/errors";
import { ERROR_CODE } from "./constants.ts";

const formatGraphqlErrors = (errors: GraphQLErrors) => {
  return errors.reduce(
    (accum, error) => {
      const errorCode = error.extensions.code as ERROR_CODE;

      accum[errorCode] = {
        payload: error.extensions.payload || null,
      };

      return accum;
    },
    {} as Record<ERROR_CODE, { payload: any }>,
  );
};

export default formatGraphqlErrors;
