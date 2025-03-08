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

const sleep = () => new Promise((res) => setTimeout(res, 3000));

const resolver = async (_, { input }: Args, { userService, userId }: CustomContext) => {
  await sleep();
  return await userService.editProfilePicture({ userId, newProfilePictureUrl: input.profilePictureUrl });
};

export default composeResolvers(authRequired, withValidation(validationSchema))(resolver);
