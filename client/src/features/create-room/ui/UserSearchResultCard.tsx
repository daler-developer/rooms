import { User } from "@/__generated__/graphql.ts";
import { Avatar, Button } from "@/shared/ui";
import { useFormContext } from "@/shared/lib/form";
import { FormFields } from "./CreateRoomForm.tsx";
import { SUBSCRIBE_TO_USER_ONLINE_STATUS_CHANGE } from "../gql";
import { useSubscription } from "@apollo/client";
import { UserCard } from "@/entities/user";

type Props = {
  user: Pick<User, "id" | "profilePictureUrl" | "email">;
};

const UserSearchResultCard = ({ user }: Props) => {
  const form = useFormContext<FormFields>();

  useSubscription(SUBSCRIBE_TO_USER_ONLINE_STATUS_CHANGE);

  const handleInvite = () => {
    form.appendArrayItem("invitedUsers", user);
  };

  const handleRemoveInvite = () => {
    const idx = form.findArrayItemIndex("invitedUsers", (_user) => {
      return _user.id === user.id;
    });

    form.removeArrayItem("invitedUsers", idx);
  };

  const isInvited = form.getValue("invitedUsers").find((_user) => _user.id === user.id);

  return (
    <UserCard
      as="li"
      user={user}
      actions={
        isInvited ? (
          <Button type="button" color="red" size="sm" onClick={handleRemoveInvite}>
            Remove
          </Button>
        ) : (
          <Button type="button" size="sm" onClick={handleInvite}>
            Invite
          </Button>
        )
      }
    />
  );
};

export default UserSearchResultCard;
