import { type TemporaryMessage } from "@/widgets/room-chat/store";
import MessageImages from "@/widgets/room-chat/ui/MessageImages.tsx";
import { Avatar } from "@/shared/ui";
import clsx from "clsx";
import { useQuery } from "@apollo/client";
import { GET_ME } from "@/entities/user";

type Props = {
  temporaryMessage: TemporaryMessage;
};

const TemporaryMessage = ({ temporaryMessage }: Props) => {
  const { data } = useQuery(GET_ME, {
    fetchPolicy: "cache-only",
  });

  return (
    <div className={clsx("flex justify-end gap-2")}>
      <div className={clsx("w-[300px] flex flex-col bg-indigo-500 text-white rounded-lg p-3")}>
        <p>{temporaryMessage.text}</p>
      </div>
      <Avatar src={data!.me.profilePictureUrl || ""} size="sm" />
    </div>
  );
};

export default TemporaryMessage;
