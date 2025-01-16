import type { GetMessageViewersQuery } from "@/__generated__/graphql.ts";
import { UserCard } from "@/entities/user";

type Props = {
  viewer: Flatten<GetMessageViewersQuery["message"]["viewers"]>;
};

const MessageViewer = ({ viewer }: Props) => {
  return <UserCard user={viewer} as="li" />;
};

export default MessageViewer;
