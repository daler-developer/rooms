import useRoomQuery from "../../../hooks/useRoomQuery";

const ParticipantsOnlineCount = () => {
  const { data: roomData } = useRoomQuery();

  return (
    <div>
      <span className="text-green-600 text-[14px]">{roomData!.room.participantsOnlineCount} online</span>
    </div>
  );
};

export default ParticipantsOnlineCount;
