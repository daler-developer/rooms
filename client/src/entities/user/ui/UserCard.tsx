import { ComponentType, ReactElement, JSX, Fragment } from "react";
import { User } from "@/__generated__/graphql.ts";
import { Avatar, Badge } from "@/shared/ui";

type Props = {
  user: Pick<User, "firstName" | "lastName" | "profilePictureUrl" | "isOnline">;
  actions?: ReactElement[];
  as?: ComponentType<any> | keyof JSX.IntrinsicElements;
};

const UserCard = ({ user, actions, as: Component = "div" }: Props) => {
  return (
    <Component className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Avatar src={user.profilePictureUrl || ""} size="sm" badgeContent={<Badge badgeColor={user.isOnline ? "green" : "gray"} />} />
        <div className="flex items-center gap-1 font-medium">
          <span>{user.firstName}</span>
          <span>{user.lastName}</span>
        </div>
      </div>

      {actions && (
        <div className="flex items-center gap-2">
          {actions.map((action, i) => (
            <Fragment key={i}>{action}</Fragment>
          ))}
        </div>
      )}
    </Component>
  );
};

export default UserCard;
