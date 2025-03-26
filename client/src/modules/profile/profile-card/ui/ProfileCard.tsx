import { Avatar } from "@/shared/ui";
import { NetworkStatus } from "@apollo/client";
import useGetMeQuery from "../gql/useGetMeQuery.ts";

const ProfileCard = () => {
  const queries = {
    me: useGetMeQuery(),
  };

  if (queries.me.networkStatus === NetworkStatus.ready) {
    return (
      <div className="inline-flex items-center gap-2">
        <Avatar size="md" src={queries.me.data!.me.profilePictureUrl} />
        <div className="font-medium">
          {queries.me.data!.me.firstName} {queries.me.data!.me.lastName}
        </div>
      </div>
    );
  }

  return null;
};

export default ProfileCard;
