import { NetworkStatus } from "@apollo/client";
import { FaRegEnvelope } from "react-icons/fa";
import { IconButton, Skeleton } from "@/shared/ui";
import useGetInvitationsCountQuery from "../gql/useGetInvitationsCountQuery.ts";
import useInvitationsCountUpdatedSub from "../gql/useInvitationsCountUpdatedSub.ts";

type Props = {
  onClick: () => void;
};

const InvitationsButton = ({ onClick }: Props) => {
  const queries = {
    invitationsCount: useGetInvitationsCountQuery(),
  };

  useInvitationsCountUpdatedSub();

  if (queries.invitationsCount.networkStatus === NetworkStatus.ready) {
    return (
      <IconButton
        color="light"
        type="button"
        Icon={FaRegEnvelope}
        onClick={() => onClick()}
        withBadge
        badgeColor="blue"
        badgeContent={queries.invitationsCount.data!.invitationsCount}
      />
    );
  }

  return <Skeleton type="circular" size={20} />;
};

export default InvitationsButton;
