import useGetRoomQuery from "../../gql/useGetRoomQuery";
import useParticipantsOnlineCountChangeSub from "../../gql/useParticipantsOnlineCountChangeSub";

const ParticipantsOnlineCount = () => {
  const queries = {
    room: useGetRoomQuery(),
  };

  useParticipantsOnlineCountChangeSub();

  return (
    <div>
      <span className="text-green-600 text-[14px]">{queries.room.data!.room.participantsOnlineCount} online</span>
    </div>
  );
};

export default ParticipantsOnlineCount;
