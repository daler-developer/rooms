import { CustomContext } from "../../types";
import { authRequired, checkBlockedStatus, composeResolvers } from "../../lib/graphql/resolver-wrappers";

const resolver = async (parent, __, { roomService }: CustomContext) => {
  return await roomService.fetchRoomById(parent.roomId);
};

export default composeResolvers(authRequired, checkBlockedStatus)(resolver);
