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

const sleep = () => new Promise((res) => setTimeout(res, 3000));

const UploadProfilePicture = async (_, { input }: Args, { userService, userId }: CustomContext) => {
  await sleep();
  return await userService.updateUserProfilePicture(userId, input.profilePictureUrl);
};

export default UploadProfilePicture;
