import { NetworkStatus, useApolloClient, useSubscription, useQuery } from "@apollo/client";
import { GET_ME, SUBSCRIBE_TO_ME_INVITED_TO_ROOM } from "../gql/tags.ts";
import { FaRegEnvelope } from "react-icons/fa";
import { IconButton } from "@/shared/ui";

type Props = {
  onClick: () => void;
};

const InvitationsButton = ({ onClick }: Props) => {
  const { data: meResult } = useQuery(GET_ME);

  if (meResult) {
    return (
      <IconButton
        color="light"
        type="button"
        Icon={FaRegEnvelope}
        onClick={() => onClick()}
        withBadge
        badgeColor="blue"
        badgeContent={meResult.me.invitationsCount}
      />
    );
  }

  return null;
};

export default InvitationsButton;
