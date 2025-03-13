import { Chip, ChipColor } from "@/shared/ui";
import { useMemo } from "react";
import { arrayGetRandomElement } from "@/shared/lib/utils";
import { User } from "./UsersSelector.tsx";

type Props = {
  user: User;
  onDeselect: () => void;
};

const UsersSelectorSelectedUser = ({ user, onDeselect }: Props) => {
  const chipColor = useMemo(() => {
    const allColors: ChipColor[] = ["blue", "red", "green", "amber", "purple"];

    return arrayGetRandomElement(allColors);
  }, []);

  return (
    <Chip key={user.id} text={`${user.firstName} ${user.lastName}`} withAvatar={true} avatar={user.profilePictureUrl} onDelete={onDeselect} color={chipColor} />
  );
};

export default UsersSelectorSelectedUser;
