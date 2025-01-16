import * as yup from "yup";

import { authRequired, composeResolvers, withValidation } from "../../lib/graphql/resolver-wrappers";
import { CustomContext } from "../../types";
import { InferType } from "yup";

const validationSchema = yup.object({});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { invitationService, userId }: CustomContext) => {
  return await invitationService.fetchUserInvitations(userId);
};

export default composeResolvers(authRequired, withValidation(validationSchema))(resolver);
