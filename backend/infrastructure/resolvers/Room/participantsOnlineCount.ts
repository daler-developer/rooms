import { CustomContext } from "../../types";
import { authRequired, composeResolvers } from "../../lib/graphql/resolver-wrappers";
import { Room } from "../../../core/entities/Room";

const resolver = async (parent: Room, __, { roomService }: CustomContext) => {
  return await roomService.fetchUsersOnlineCountInRoom(parent.id);
};

export default composeResolvers(authRequired)(resolver);
