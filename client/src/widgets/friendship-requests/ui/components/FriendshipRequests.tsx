import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useTypedDispatch } from "../../../../shared/hooks";
import { profileActions, profileSelectors } from "../../../../shared/store";
import useTypedSelector from "../../../../shared/hooks/useTypedSelector";
import FriendshipRequest from "./FriendshipRequest";

const FriendshipRequests = () => {
  const dispatch = useTypedDispatch();

  const friendshipRequests = useTypedSelector(
    profileSelectors.selectFriendshipRequests,
  );

  const getFriendshipRequests = async () => {
    await dispatch(
      profileActions.getFriendshipRequests({
        offset: friendshipRequests.data.length,
      }),
    );
  };

  useEffect(() => {
    getFriendshipRequests();

    return () => {
      dispatch(profileActions.clearFriendshipRequests());
    };
  }, []);

  const handleMore = () => {
    getFriendshipRequests();
  };

  return (
    <div>
      <ul className="flex flex-col gap-y-[5px]">
        {friendshipRequests.data.map((friendshipRequest) => (
          <FriendshipRequest
            friendshipRequest={friendshipRequest}
            key={friendshipRequest.id}
          />
        ))}
      </ul>
      <Button type="button" onClick={handleMore} className="w-full mt-[20px]">
        More(30)
      </Button>
    </div>
  );
};

export default FriendshipRequests;
