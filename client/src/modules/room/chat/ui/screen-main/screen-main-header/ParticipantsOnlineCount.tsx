import useGetRoomQuery from "../../../gql/useGetRoomQuery";

const ParticipantsOnlineCount = () => {
  const queries = {
    room: useGetRoomQuery(),
  };

  return (
    <div>
      <span className="text-green-600 text-[14px]">{queries.room.data!.room.participantsOnlineCount} online</span>
    </div>
  );
};

export default ParticipantsOnlineCount;
