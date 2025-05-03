import { CustomContext } from "../../types";
import { authRequired, checkBlockedStatus, composeResolvers } from "../../lib/graphql/resolver-wrappers";
import { Invitation } from "../../../core/entities/Invitation";

const resolver = async (parent: Invitation, __, { roomService, userId }: CustomContext) => {
  return await roomService.fetchInvitationRoom({ currentUserId: userId, invitation: parent });
};

export default composeResolvers(authRequired, checkBlockedStatus)(resolver);
