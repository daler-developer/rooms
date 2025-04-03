import { type RoomChatGetRoomParticipantsQuery } from "@/__generated__/graphql.ts";
import { UserCard } from "@/entities/user";
import { useRoomChatStore } from "../../../context";
import { Button } from "@/shared/ui";
import { useMemo } from "react";
import useGetRoomQuery from "../../../gql/useGetRoomQuery.ts";
import { useAuth } from "@/modules/auth";
import useExcludeUserFromRoomMutation from "../../gql/useExcludeUserFromRoomMutation.ts";

type Props = {
  participant: Flatten<RoomChatGetRoomParticipantsQuery["room"]["participants"]>;
};

const RoomInfoTabParticipantsItem = ({ participant }: Props) => {
  const { userId } = useAuth();

  const { roomId } = useRoomChatStore();

  const queries = {
    room: useGetRoomQuery(),
  };

  const mutations = {
    excludeUserFromRoom: useExcludeUserFromRoomMutation({ roomId, userId: participant.id }),
  };

  const handleExclude = async () => {
    await mutations.excludeUserFromRoom.mutate();
  };

  const participantIsMe = useMemo(() => {
    return participant.id === userId;
  }, [participant.id, userId]);

  const roomCreatorIsMe = useMemo(() => {
    return queries.room.data!.room.creatorId === userId;
  }, [queries.room.data, userId]);

  const isAllowedToExclude = useMemo(() => {
    return !participantIsMe && roomCreatorIsMe;
  }, [participantIsMe, roomCreatorIsMe]);

  return (
    <UserCard
      as="li"
      userFirstName={participant.firstName}
      userLastName={participant.lastName}
      userProfilePictureUrl={participant.profilePictureUrl}
      userIsOnline={participant.isOnline}
      right={
        <div className="flex items-center gap-1">
          {participantIsMe && <span className="font-medium italic text-gray-500 text-[16px] pr-2">You</span>}
          {isAllowedToExclude && (
            <Button type="button" color="red" size="sm" isLoading={mutations.excludeUserFromRoom.loading} onClick={handleExclude}>
              Exclude
            </Button>
          )}
        </div>
      }
    />
  );
};

export default RoomInfoTabParticipantsItem;

/*
26	163	2025-03-10 13:11:51.209656
26	164	2025-03-10 13:47:17.009579
26	165	2025-03-10 13:53:29.482655
* */
