import { GetMyRoomsQuery } from "@/__generated__/graphql.ts";
import { useMemo } from "react";

type Props = {
  message: NonNullable<Flatten<GetMyRoomsQuery["me"]["rooms"]>["lastMessage"]>;
};

const RoomsListItemLastMessage = ({ message }: Props) => {
  return (
    <div className="flex items-center text-[13px] gap-[4px]">
      <div className="font-medium">
        {message.sender.firstName} {message.sender.lastName}:
      </div>
      <div className="text-gray-600">{message.text}</div>
    </div>
  );
};

export default RoomsListItemLastMessage;
