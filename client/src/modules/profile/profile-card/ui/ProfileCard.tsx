import { Avatar } from "@/shared/ui";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_ME } from "../gql/tags.ts";

const ProfileCard = () => {
  const { data, networkStatus } = useQuery(GET_ME);

  if (networkStatus === NetworkStatus.ready) {
    return (
      <div className="inline-flex items-center gap-2">
        <Avatar size="md" src={data!.me.profilePictureUrl} />
        <div className="font-medium">
          {data!.me.firstName} {data!.me.lastName}
        </div>
      </div>
    );
  }

  return null;
};

export default ProfileCard;
