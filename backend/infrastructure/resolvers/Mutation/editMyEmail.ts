import { GraphQLError } from "graphql";
import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";

const validationSchema = yup.object({
  newEmail: yup.string().required(),
});

type Args = {
  input: InferType<typeof validationSchema>;
};

const editMyEmail = async (_, { input }: Args, { userService, userId }: CustomContext) => {
  const updatedUser = await userService.editUserEmail(userId, input.newEmail);

  return updatedUser;
};

export default editMyEmail;
