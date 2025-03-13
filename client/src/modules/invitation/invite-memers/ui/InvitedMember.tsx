import { SearchUsersQuery } from "@/__generated__/graphql.ts";
import { Chip, ChipColor } from "@/shared/ui";
import { useMemo } from "react";
import { arrayGetRandomElement } from "@/shared/lib/utils";

type Props = {
  user: Flatten<SearchUsersQuery["searchUsers"]["users"]>;
  onDelete: () => void;
};

const InvitedMember = ({ user, onDelete }: Props) => {
  const chipColor = useMemo(() => {
    const allColors: ChipColor[] = ["blue", "red", "green", "amber", "purple"];

    return arrayGetRandomElement(allColors);
  }, []);

  return <Chip key={user.id} text={user.email} withAvatar={true} avatar={user.profilePictureUrl} onDelete={onDelete} color={chipColor} />;
};

export default InvitedMember;
