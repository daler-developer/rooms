import { type User } from "@/widgets/users-selector";

export type FormValues = {
  name: string;
  invitedUsers: User[];
  thumbnail: File | null;
};
