import { type RoomChatGetRoomParticipantsQuery } from "@/__generated__/graphql.ts";
import { useAuth } from "@/modules/auth";
import { UserCard } from "@/entities/user";
import { useRoomId } from "../../../context";
import { Button } from "@/shared/ui";
import { useMemo } from "react";
import useGetRoomQuery from "../../../gql/useGetRoomQuery.ts";
import useExcludeUserFromRoomMutation from "../../gql/useExcludeUserFromRoomMutation.ts";

type Props = {
  participant: Flatten<RoomChatGetRoomParticipantsQuery["room"]["participants"]>;
};

const RoomInfoTabParticipantsItem = ({ participant }: Props) => {
  const roomId = useRoomId();
  const { userId } = useAuth();

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
