import { NetworkStatus } from "@apollo/client";
import { FaRegEnvelope } from "react-icons/fa";
import { IconButton, Skeleton } from "@/shared/ui";
import useGetMeQuery from "../gql/useGetMeQuery.ts";
import useNewInvitationSubscribe from "../gql/useNewInvitationSubscribe.ts";

type Props = {
  onClick: () => void;
};

const InvitationsButton = ({ onClick }: Props) => {
  const queries = {
    me: useGetMeQuery(),
  };

  useNewInvitationSubscribe();

  if (queries.me.networkStatus === NetworkStatus.ready) {
    return (
      <IconButton
        color="light"
        type="button"
        Icon={FaRegEnvelope}
        onClick={() => onClick()}
        withBadge
        badgeColor="blue"
        badgeContent={queries.me.data!.me.invitationsCount}
      />
    );
  }

  return <Skeleton type="circular" size={20} />;
};

export default InvitationsButton;
