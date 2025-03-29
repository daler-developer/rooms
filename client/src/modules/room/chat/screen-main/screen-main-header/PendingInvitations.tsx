import useGetRoomQuery from "../../gql/useGetRoomQuery";
import useRoomPendingInvitationsCountChangeSub from "../../gql/useRoomPendingInvitationsCountChangeSub";

const PendingInvitations = () => {
  const queries = {
    room: useGetRoomQuery(),
  };

  useRoomPendingInvitationsCountChangeSub();

  return <div className="text-sm">Pending invitations: {queries.room.data!.room.pendingInvitationsCount}</div>;
};

export default PendingInvitations;
