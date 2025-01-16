import { gql } from "@/__generated__";

const LEAVE_ROOM = gql(`
  mutation LeaveRoom($input: LeaveRoomInput!) {
    leaveRoom(input: $input)
  }
`);

export { LEAVE_ROOM };
