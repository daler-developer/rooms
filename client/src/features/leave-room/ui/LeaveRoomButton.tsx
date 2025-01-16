import { Button } from "@/shared/ui";
import { LEAVE_ROOM } from "../gql/tags.ts";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME_ID_ONLY } from "@/entities/user";

type Props = {
  roomId: number;
};

const LeaveRoomButton = ({ roomId }: Props) => {
  const { data } = useQuery(GET_ME_ID_ONLY);

  const [leaveRoom, { loading }] = useMutation(LEAVE_ROOM, {
    variables: {
      input: {
        roomId,
      },
    },
    update(cache) {
      cache.modify({
        id: cache.identify(data!.me),
        fields: {
          rooms(currentRooms, { readField }) {
            return currentRooms.filter((room) => readField("id", room) !== roomId);
          },
        },
      });
    },
  });

  const handleClick = async () => {
    await leaveRoom();
  };

  return (
    <Button type="button" isLoading={loading} onClick={handleClick}>
      Leave
    </Button>
  );
};

export default LeaveRoomButton;
