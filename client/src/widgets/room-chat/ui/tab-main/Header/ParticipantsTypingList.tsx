import { GetRoomQuery } from "@/__generated__/graphql";
import { useMemo } from "react";

type Props = {
  users: GetRoomQuery["room"]["participantsTyping"];
};

const ParticipantsTypingList = ({ users }: Props) => {
  const text = useMemo(() => {
    if (users.length === 1) {
      return `${users[0].firstName} ${users[0].lastName} is typing...`;
    }

    if (users.length >= 4) {
      return `${users.length} users are typing...`;
    }

    let result = `${users[0].firstName} ${users[0].lastName}`;

    for (let i = 1; i < users.length; i++) {
      const isLast = i + 1 === users.length;
      const user = users[i];

      if (isLast) {
        result += ` and ${user.firstName} ${user.lastName} are typing...`;
      } else {
        result += `, ${user.firstName} ${user.lastName}`;
      }
    }

    return result;
  }, [users]);

  return <div className="text-[14px] text-gray-500">{text}</div>;
};

export default ParticipantsTypingList;
