import { UsersSelector, type User } from "@/widgets/users-selector";
import { useAuth } from "@/modules/auth";
import { GET_PARTICIPANTS, GET_INVITED_USERS } from "../gql/tags.ts";
import { useFormContext } from "@/shared/lib/form";
import { FormValues } from "../types";
import { useQuery } from "@apollo/client";

type Props = {
  roomId: number;
};

const InviteUsersToRoomForm = ({ roomId }: Props) => {
  const form = useFormContext<FormValues>();
  const { userId } = useAuth();

  const queries = {
    participants: useQuery(GET_PARTICIPANTS, {
      variables: { roomId },
      fetchPolicy: "cache-only",
    }),
    invitedUsers: useQuery(GET_INVITED_USERS, {
      variables: { roomId },
      fetchPolicy: "cache-only",
    }),
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
