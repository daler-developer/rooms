import { SearchUsersQuery } from "@/__generated__/graphql.ts";

export type FormValues = {
  name: string;
  invitedUsers: SearchUsersQuery["searchUsers"]["users"];
  thumbnail: File | null;
};
