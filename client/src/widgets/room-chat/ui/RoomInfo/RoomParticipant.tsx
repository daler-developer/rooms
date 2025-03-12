import { type GetRoomParticipantsQuery } from "@/__generated__/graphql.ts";
import { UserCard } from "@/entities/user";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import { Button } from "@/shared/ui";
import { ReactElement, useMemo } from "react";
import useRoomQuery from "@/widgets/room-chat/hooks/useRoomQuery.ts";
import { useAuth } from "@/modules/auth";
import useExcludeUserFromRoomMutation from "../../gql/useExcludeUserFromRoomMutation";

type Props = {
  participant: Flatten<GetRoomParticipantsQuery["room"]["participants"]>;
};

const RoomParticipant = ({ participant }: Props) => {
  const { userId } = useAuth();

  const { roomId } = useRoomChatStore();

  const queries = {
    room: useRoomQuery(),
  };

  const mutations = {
    excludeUserFromRoom: useExcludeUserFromRoomMutation({ roomId, userId: participant.id }),
  };

  const handleExclude = async () => {
    await mutations.excludeUserFromRoom.mutate({
      variables: {
        roomId,
        userId: participant.id,
      },
    });
  };

  const participantIsMe = useMemo(() => {
    return participant.id === userId;
  }, [participant.id, userId]);

  const roomCreatorIsMe = useMemo(() => {
    return queries.room.data!.room.creatorId === userId;
  }, [queries.room.data, userId]);

  const allowedActions = useMemo(() => {
    const list: ReactElement[] = [];

    if (roomCreatorIsMe && !participantIsMe) {
      list.push(
        <Button type="button" color="red" size="sm" isLoading={mutations.excludeUserFromRoom.loading} onClick={handleExclude}>
          Exclude
        </Button>,
      );
    }
    return list;
  }, [mutations.excludeUserFromRoom.loading, participantIsMe, roomCreatorIsMe]);

  return <UserCard user={participant} as="li" actions={allowedActions} />;
};

export default RoomParticipant;

/*
26	163	2025-03-10 13:11:51.209656
26	164	2025-03-10 13:47:17.009579
26	165	2025-03-10 13:53:29.482655
* */
