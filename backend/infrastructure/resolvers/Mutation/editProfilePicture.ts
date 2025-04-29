import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { authRequired, composeResolvers, withValidation } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  profilePictureUrl: yup.string(),
});

type Args = {
  input: InferType<typeof validationSchema>;
};

const resolver = async (_, { input }: Args, { userService, userId }: CustomContext) => {
  return await userService.editProfilePicture({ currentUserId: userId, newProfilePictureUrl: input.profilePictureUrl });
};

export default composeResolvers(authRequired, withValidation(validationSchema))(resolver);
