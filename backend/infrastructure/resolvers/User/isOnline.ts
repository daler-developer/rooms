import * as yup from "yup";

import { authRequired, composeResolvers, withValidation } from "../../lib/graphql/resolver-wrappers";
import { CustomContext } from "../../types";
import { User } from "../../../core/entities/User";

const validationSchema = yup.object({});

const resolver = async (parent: User, _, { userService }: CustomContext) => {
  return await userService.fetchUserIsOnlineStatus(parent.id);
};

export default composeResolvers(authRequired, withValidation(validationSchema))(resolver);
