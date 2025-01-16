import { GraphQLError } from "graphql";
import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";

const validationSchema = yup.object({
  profilePictureUrl: yup.string().required(),
});

type Args = {
  input: InferType<typeof validationSchema>;
};

const UploadProfilePicture = async (_, { input }: Args, { userService, userId }: CustomContext) => {
  const updatedUser = await userService.updateUserProfilePicture(userId, input.profilePictureUrl);

  return updatedUser;
};

export default UploadProfilePicture;
