import { CustomContext } from "../../types";
import { authRequired, checkBlockedStatus, composeResolvers } from "../../lib/graphql/resolver-wrappers";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const resolver = async (parent, __, { roomService }: CustomContext) => {
  await sleep(1000);
  return await roomService.fetchRoomById(parent.roomId);
};

export default composeResolvers(authRequired, checkBlockedStatus)(resolver);
