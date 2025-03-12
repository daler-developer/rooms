import { RoomsListQuery } from "@/__generated__/graphql.ts";

type Props = {
  message: NonNullable<Flatten<RoomsListQuery["rooms"]>["lastMessage"]>;
};

const RoomsListItemLastMessage = ({ message }: Props) => {
  return (
    <div className="text-[13px] whitespace-nowrap overflow-hidden overflow-ellipsis gap-[4px]">
      <span className="font-medium">
        {message.sender.firstName} {message.sender.lastName}:
      </span>
      <span> </span>
      <span className="text-gray-600">{message.text}</span>
    </div>
  );
};

export default RoomsListItemLastMessage;
