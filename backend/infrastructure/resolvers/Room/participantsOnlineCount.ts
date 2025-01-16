import { CustomContext } from "../../types";
import { authRequired, checkBlockedStatus, composeResolvers } from "../../lib/graphql/resolver-wrappers";
import { Room } from "../../../core/entities/Room";

const resolver = async (parent: Room, __, { roomService }: CustomContext) => {
  return await roomService.fetchUsersOnlineCountInRoom(parent.id);
};

export default composeResolvers(authRequired, checkBlockedStatus)(resolver);
