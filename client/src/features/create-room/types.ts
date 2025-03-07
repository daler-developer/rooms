import { CreateRoomSearchUsersQuery } from "@/__generated__/graphql.ts";

export type FormValues = {
  name: string;
  invitedUsers: CreateRoomSearchUsersQuery["searchUsers"]["data"];
  thumbnail: File | null;
};
