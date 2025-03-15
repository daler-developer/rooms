import { gql } from "@/__generated__";

export const ROOM_PENDING_INVITATIONS_COUNT_CHANGE = gql(`
  subscription RoomChatPendingInvitationsCountChange($roomId: Int!) {
    roomPendingInvitationsCountChange(roomId: $roomId) {
      id
      pendingInvitationsCount
    }
  }
`);
