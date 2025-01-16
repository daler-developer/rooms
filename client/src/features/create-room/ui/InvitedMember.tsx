import { SearchUsersQuery } from "@/__generated__/graphql.ts";
import { Chip, ChipColor } from "@/shared/ui";
import { useMemo } from "react";
import { useFormContext } from "@/shared/lib/form";
import { arrayGetRandomElement } from "@/shared/lib/utils";
import { FormFields } from "./CreateRoomForm.tsx";

type Props = {
  user: Flatten<SearchUsersQuery["searchUsers"]["users"]>;
};

const InvitedMember = ({ user }: Props) => {
  const form = useFormContext<FormFields>();

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

  return <Chip key={user.id} text={user.email} withAvatar={true} avatar={user.profilePictureUrl} onDelete={handleDelete} color={chipColor} />;
};

export default InvitedMember;
