import { CustomContext } from "../../types";

const passwordLength = async (_, __, { userService, userId }: CustomContext) => {
  const length = await userService.getUserPasswordLength(userId);

  return length;
};

export default passwordLength;
