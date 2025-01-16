import { GetMyRoomsQuery } from "@/__generated__/graphql.ts";
import { useMemo } from "react";

type Props = {
  message: NonNullable<Flatten<GetMyRoomsQuery["me"]["rooms"]>["lastMessage"]>;
};

const RoomCardLastMessage = ({ message }: Props) => {
  // const isSentByMe = useMemo(() => {
  //   return message.sender.email
  // }, []);

  return (
    <div className="flex items-center gap-[4px]">
      <div className="font-medium">{message.sender.email}:</div>
      <div>{message.text}</div>
    </div>
  );
};

export default RoomCardLastMessage;
