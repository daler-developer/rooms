import { UsersSelector, type User } from "@/widgets/users-selector";
import { useAuth } from "@/modules/auth";
import useGetParticipantsQuery from "../gql/useGetParticipantsQuery.ts";
import useGetInvitedUsersQuery from "../gql/useGetInvitedUsersQuery.ts";
import { useFormContext } from "@/shared/lib/form";
import { FormValues } from "../types";

type Props = {
  roomId: number;
};

const InviteUsersToRoomForm = ({ roomId }: Props) => {
  const form = useFormContext<FormValues>();
  const { userId } = useAuth();

  const queries = {
    participants: useGetParticipantsQuery({ roomId }),
    invitedUsers: useGetInvitedUsersQuery({ roomId }),
  };

  const userIsMe = (user: User) => {
    return user.id === userId;
  };

  const userIsInvited = (user: User) => {
    return Boolean(queries.invitedUsers.data!.room.invitedUsers.find((_user) => _user.id === user.id));
  };

  const userIsParticipant = (user: User) => {
    return Boolean(queries.participants.data!.room.participants.find((_user) => _user.id === user.id));
  };

  return (
    <UsersSelector
      users={form.getValue("usersSelected")}
      onSelect={(user) => {
        form.appendArrayItem("usersSelected", user);
      }}
      onDeselect={(user) => {
        const idx = form.findArrayItemIndex("usersSelected", (_user) => _user.id === user.id);
        form.removeArrayItem("usersSelected", idx);
      }}
      userIsSelectable={(user) => {
        return !userIsMe(user) && !userIsInvited(user) && !userIsParticipant(user);
      }}
      badgeContent={(user) => {
        if (userIsMe(user)) {
          return <span className="font-medium text-gray-500 text-[15px] italic pr-2">You</span>;
        }
        if (userIsInvited(user)) {
          return <span className="font-medium text-gray-500 text-[15px] italic pr-2">Already invited</span>;
        }
        if (userIsParticipant(user)) {
          return <span className="font-medium text-gray-500 text-[15px] italic pr-2">Participant</span>;
        }
        return null;
      }}
    />
  );
};

export default InviteUsersToRoomForm;
