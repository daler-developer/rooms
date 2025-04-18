import { CreateRoomSearchUsersQuery } from "@/__generated__/graphql.ts";
import { Chip, ChipColor } from "@/shared/ui";
import { useMemo } from "react";
import { arrayGetRandomElement } from "@/shared/lib/utils";
import { useCreateRoomForm } from "../../../hooks.ts";

type Props = {
  user: Flatten<CreateRoomSearchUsersQuery["searchUsers"]["data"]>;
};

const InviteUsersStepInvitedMember = ({ user }: Props) => {
  const form = useCreateRoomForm();

  const chipColor = useMemo(() => {
    const allColors: ChipColor[] = ["blue", "red", "green", "amber", "purple"];

    return arrayGetRandomElement(allColors);
  }, []);

  const handleDelete = () => {
    const idx = form.findArrayItemIndex("invitedUsers", (_user) => {
      return _user.id === user.id;
    });

    form.removeArrayItem("invitedUsers", idx);
  };

  return (
    <Chip
      key={user.id}
      text={`${user.firstName} ${user.lastName}`}
      withAvatar={true}
      avatar={user.profilePictureUrl}
      onDelete={handleDelete}
      color={chipColor}
    />
  );
};

export default InviteUsersStepInvitedMember;
