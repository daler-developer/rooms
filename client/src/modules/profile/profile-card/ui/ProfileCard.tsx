import { Avatar, IconButton, Dropdown } from "@/shared/ui";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_ME } from "../gql/tags.ts";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { useLogout } from "@/modules/auth";

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
