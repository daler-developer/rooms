import { ComponentType, ReactElement, JSX } from "react";
import { User } from "@/__generated__/graphql.ts";
import { Avatar } from "@/shared/ui";

type Props = {
  user: Pick<User, "email" | "profilePictureUrl" | "isOnline">;
  actions?: ReactElement;
  as?: ComponentType<any> | keyof JSX.IntrinsicElements;
};

const UserCard = ({ user, actions, as: Component = "div" }: Props) => {
  return (
    <Component className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Avatar src={user.profilePictureUrl || ""} size="sm" status={user.isOnline ? "online" : "offline"} />
        <span>{user.email}</span>
      </div>

      <div className="flex items-center gap-2">{actions}</div>
    </Component>
  );
};

export default UserCard;
