import { useEffect, useState } from "react";
import { useSubscription } from "@apollo/client";
import { gql } from "@/__generated__";
import { SUBSCRIBE_TO_ME_INVITED_TO_ROOM } from "../gql/tags.ts";
import { useToast } from "@/shared/ui";

const useSubscribeToMeInvitedToRoom = () => {
  const [hasToken, setHasToken] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setHasToken(true);
    }
  }, []);

  useSubscription(SUBSCRIBE_TO_ME_INVITED_TO_ROOM, {
    onData({ data, client }) {
      const { me } = client.cache.readQuery({
        query: gql(`
          query PrevMeInvitationsCount {
            me {
              id
              invitationsCount
            }
          }
        `),
      })!;

      client.cache.writeQuery({
        query: gql(`
          query UpdateMeInvitationsCount {
            me {
              id
              invitationsCount
            }
          }
        `),
        data: {
          me: {
            __typename: "User",
            id: me.id,
            invitationsCount: me.invitationsCount + 1,
          },
        },
      });

      toast.info(`You are invited to room: ${data.data!.meIsInvitedToRoom.room.name}`);
    },
    skip: !hasToken,
  });
};

export default useSubscribeToMeInvitedToRoom;
