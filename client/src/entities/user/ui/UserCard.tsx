import { ComponentType, JSX, ReactNode } from "react";
import { User } from "@/__generated__/graphql.ts";
import { Avatar, Badge } from "@/shared/ui";

type Props = {
  userFirstName: User["firstName"];
  userLastName: User["lastName"];
  userIsOnline: User["isOnline"];
  userProfilePictureUrl: User["profilePictureUrl"];
  as?: ComponentType<any> | keyof JSX.IntrinsicElements;
  right?: ReactNode;
};

const UserCard = ({ userFirstName, userLastName, userIsOnline, userProfilePictureUrl, as: Component = "div", right }: Props) => {
  return (
    <Component className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Avatar src={userProfilePictureUrl} size="sm" badgeContent={<Badge badgeColor={userIsOnline ? "green" : "gray"} />} />
        <div className="flex items-center gap-1 font-medium">
          <span>{userFirstName}</span>
          <span>{userLastName}</span>
        </div>
      </div>

      {right && <div>{right}</div>}
    </Component>
  );
};

export default UserCard;
