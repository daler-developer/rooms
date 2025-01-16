import { User } from "@/__generated__/graphql.ts";

import { BlockUserButton } from "@/features/block-user";
import { UnblockUserButton } from "@/features/unblock-user";

type Props = {
  user: Pick<User, "id" | "email" | "isBlocked">;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="border border-black">
      <span>{user.email}</span>
      {user.isBlocked && <UnblockUserButton userId={user.id} />}
      {!user.isBlocked && <BlockUserButton userId={user.id} />}
    </div>
  );
};

export default UserCard;
