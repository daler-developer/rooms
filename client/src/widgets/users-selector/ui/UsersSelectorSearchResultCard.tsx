import { Button } from "@/shared/ui";
import { User } from "./UsersSelector";
import { UserCard } from "@/entities/user";

type Props = {
  user: User;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
  isSelectable: boolean;
};

const UsersSelectorSearchResultCard = ({ user, onSelect, onDeselect, isSelected, isSelectable }: Props) => {
  return (
    <UserCard
      as="li"
      userFirstName={user.firstName}
      userLastName={user.lastName}
      userProfilePictureUrl={user.profilePictureUrl}
      userIsOnline={user.isOnline}
      right={
        <div>
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
