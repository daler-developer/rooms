import { useEffect, useState } from "react";
import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_TO_REPLIED_TO_MY_INVITATION } from "../gql/tags.ts";
import { useToast } from "@/shared/ui";

const useSubscribeToRepliedToMyInvitation = () => {
  const [hasToken, setHasToken] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setHasToken(true);
    }
  }, []);

  useSubscription(SUBSCRIBE_TO_REPLIED_TO_MY_INVITATION, {
    onData({ data }) {
      if (data.data!.repliedToMyInvitation.accepted) {
        toast.info(
          `${data.data!.repliedToMyInvitation.invitation.invitedUser.email} accepted your invitation to room ${
            data.data!.repliedToMyInvitation.invitation.room.name
          }`,
        );
      } else {
        toast.info(
          `${data.data!.repliedToMyInvitation.invitation.invitedUser.email} rejected your invitation to room ${
            data.data!.repliedToMyInvitation.invitation.room.name
          }`,
        );
      }
    },
    skip: !hasToken,
  });
};

export default useSubscribeToRepliedToMyInvitation;
