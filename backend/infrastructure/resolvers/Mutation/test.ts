import * as yup from "yup";
import { InferType } from "yup";
import { GraphQLError } from "graphql";
import { CustomContext } from "../../types";
import { withValidation, composeResolvers } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  input: yup.object({
    foo: yup.string().required(),
    bar: yup.number().required(),
  }),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, {}: CustomContext) => {
  return {
    result: "Test",
  };
};

export default composeResolvers(withValidation(validationSchema))(resolver);
