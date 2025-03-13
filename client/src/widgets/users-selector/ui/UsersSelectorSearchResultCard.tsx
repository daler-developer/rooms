import { Button } from "@/shared/ui";
import { User } from "./UsersSelector";
import { UserCard } from "@/entities/user";
import { ReactNode } from "react";

type Props = {
  user: User;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
  isSelectable: boolean;
  badgeContent?: ReactNode;
};

const UsersSelectorSearchResultCard = ({ user, onSelect, onDeselect, isSelected, isSelectable, badgeContent }: Props) => {
  return (
    <UserCard
      as="li"
      userFirstName={user.firstName}
      userLastName={user.lastName}
      userProfilePictureUrl={user.profilePictureUrl}
      userIsOnline={user.isOnline}
      right={
        <div className="flex items-center gap-2">
          {badgeContent && <div>{badgeContent}</div>}
          {isSelectable && (
            <>
              {isSelected ? (
                <Button type="button" color="red" size="sm" onClick={onDeselect}>
                  Deselect
                </Button>
              ) : (
                <Button type="button" size="sm" onClick={onSelect}>
                  Select
                </Button>
              )}
            </>
          )}
        </div>
      }
    />
  );
};

export default UsersSelectorSearchResultCard;
