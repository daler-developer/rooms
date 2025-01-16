import { useState } from "react";
import { Avatar, Button } from "@chakra-ui/react";
import * as types from "../../../../shared/model/types";
import { useTypedDispatch } from "../../../../shared/hooks";
import { profileActions } from "../../../../shared/store";

type Props = {
  friendshipRequest: types.FriendshipRequest;
};

const FriendshipRequest = ({ friendshipRequest }: Props) => {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const dispatch = useTypedDispatch();

  const handleAccept = async () => {
    setIsAccepting(true);
    await dispatch(
      profileActions.acceptFriendshipRequest(friendshipRequest.user.id),
    );
    setIsAccepting(false);
  };

  const handleReject = async () => {
    setIsRejecting(true);
    await dispatch(
      profileActions.acceptFriendshipRequest(friendshipRequest.user.id),
    );
    setIsRejecting(false);
  };

  return (
    <li className="p-[10px] border">
      <div className="flex items-center gap-x-[10px]">
        <Avatar src="https://bit.ly/broken-link" />
        <div className="flex flex-col gap-x-[10px]">
          {friendshipRequest.user.username}
        </div>
      </div>

      <div className="flex gap-x-[5px] mt-[10px]">
        <Button
          type="button"
          onClick={handleAccept}
          size="sm"
          isLoading={isAccepting}
          colorScheme="whatsapp"
          className="flex-grow"
        >
          Accept
        </Button>
        <Button
          type="button"
          onClick={handleReject}
          size="sm"
          isLoading={isRejecting}
          colorScheme="red"
          className="flex-grow"
        >
          Reject
        </Button>
      </div>
    </li>
  );
};

export default FriendshipRequest;
