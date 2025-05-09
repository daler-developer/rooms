import { CustomContext } from "../../types";
import { authRequired, composeResolvers } from "../../lib/graphql/resolver-wrappers";
import { Room } from "../../../core/entities/Room";

const resolver = async (parent: Room, __, { userId, invitationService }: CustomContext) => {
  return await invitationService.fetchPendingInvitationsToRoom({ currentUserId: userId, roomId: parent.id });
};

export default composeResolvers(authRequired)(resolver);
