import useGetRoomQuery from "../../gql/useGetRoomQuery.ts";
import usePendingInvitationsCountChangeSub from "../gql/usePendingInvitationsCountChangeSub.ts";

const PendingInvitationsCount = () => {
  const queries = {
    room: useGetRoomQuery(),
  };

  usePendingInvitationsCountChangeSub();

  return <div className="text-sm">Pending invitations: {queries.room.data!.room.pendingInvitationsCount}</div>;
};

export default PendingInvitationsCount;
