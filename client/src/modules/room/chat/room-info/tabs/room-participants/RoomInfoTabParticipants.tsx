import { useMemo } from "react";
import { Scroll } from "@/shared/ui";
import { UserCardSkeletons } from "@/entities/user";
import RoomInfoTabParticipantsItem from "./RoomInfoTabParticipantsItem";
import { NetworkStatus } from "@apollo/client";
import useGetRoomParticipantsQuery from "../../gql/useGetRoomParticipantsQuery";
import useUserOnlineStatusChangeSub from "../../../gql/useUserOnlineStatusChangeSub";
import { useRoomId } from "../../../context";

const RoomInfoTabParticipants = () => {
  const roomId = useRoomId();

  const queries = {
    participants: useGetRoomParticipantsQuery({
      id: roomId,
    }),
  };

  const userIds = queries.participants.data?.room.participants.map((p) => p.id) || [];

  useUserOnlineStatusChangeSub({
    userIds,
  });

  const showSkeletons = useMemo(() => {
    return queries.participants.networkStatus === NetworkStatus.loading;
  }, [queries.participants.networkStatus]);

  const showParticipantsList = useMemo(() => {
    return queries.participants.networkStatus === NetworkStatus.ready && queries.participants.networkStatus;
  }, [queries.participants.networkStatus]);

  return (
    <div>
      {showSkeletons && (
        <Scroll height={300}>
          <UserCardSkeletons />
        </Scroll>
      )}
      {showParticipantsList && (
        <div>
          <ul className="flex flex-col gap-2">
            {queries.participants.data?.room.participants.map((participant) => <RoomInfoTabParticipantsItem key={participant.id} participant={participant} />)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RoomInfoTabParticipants;
