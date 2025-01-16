import { CustomContext } from "../../types";

const resolver = async (_, __, { authService }: CustomContext) => {
  return authService.startSession();
};

export default resolver;
