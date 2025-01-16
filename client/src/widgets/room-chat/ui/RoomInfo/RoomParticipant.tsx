import { type GetRoomParticipantsQuery } from "@/__generated__/graphql.ts";
import { UserCard } from "@/entities/user";
import Dropdown from "@/shared/ui/components/Dropdown/Dropdown.tsx";
import IconButton from "../../../../shared/ui/components/IconButton/IconButton.tsx";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { useMutation } from "@apollo/client";
import { EXCLUDE_USER_FROM_ROOM } from "@/widgets/room-chat/gql/tags.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";

type Props = {
  participant: Flatten<GetRoomParticipantsQuery["room"]["participants"]>;
};

const RoomParticipant = ({ participant }: Props) => {
  const { roomId } = useRoomChatStore();

  const [excludeUserFromRoom] = useMutation(EXCLUDE_USER_FROM_ROOM);

  const handleExclude = async () => {
    excludeUserFromRoom({
      variables: {
        roomId,
        userId: participant.id,
      },
    });
  };

  const dropdown = (
    <Dropdown
      items={[
        {
          label: "Exclude",
          onClick: handleExclude,
        },
      ]}
      trigger={
        <div>
          <IconButton Icon={HiMiniEllipsisVertical} color="light" type="button" />
        </div>
      }
    />
  );

  return <UserCard key={participant.id} user={participant} as="li" actions={[dropdown]} />;
};

export default RoomParticipant;
