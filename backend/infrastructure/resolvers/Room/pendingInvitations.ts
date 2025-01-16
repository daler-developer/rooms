import { CustomContext } from "../../types";
import { authRequired, checkBlockedStatus, composeResolvers } from "../../lib/graphql/resolver-wrappers";
import { Room } from "../../../core/entities/Room";

const resolver = async (parent: Room, __, { invitationService }: CustomContext) => {
  return await invitationService.fetchPendingInvitationsToRoom(parent.id);
};

export default composeResolvers(authRequired, checkBlockedStatus)(resolver);
