import { CreateRoomSearchUsersQuery } from "@/__generated__/graphql.ts";
import { Button } from "@/shared/ui";
import { useFormContext } from "@/shared/lib/form";
import { FormValues } from "../types";
import { UserCard } from "@/entities/user";

type Props = {
  user: Flatten<CreateRoomSearchUsersQuery["searchUsers"]["data"]>;
};

const InviteUsersStepUserSearchResultCard = ({ user }: Props) => {
  const form = useFormContext<FormValues>();

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

export default InviteUsersStepUserSearchResultCard;
