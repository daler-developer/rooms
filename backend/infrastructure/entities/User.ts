import { pgTable, serial, varchar, boolean, text, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { rooms } from "./Room";
import { usersToRoomsInvite } from "./UsersToRoomsInvite";
import { messages } from "./Message";

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }),
  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),
  password: varchar("password", { length: 256 }),
  isBlocked: boolean("is_blocked").default(false),
  isAdmin: boolean("is_admin").default(false),
  profilePictureUrl: text("profile_picture_url").default(null),
  invitationsCount: integer("invitations_count").default(0),
  isOnline: boolean("is_online").default(false),
});

const usersRelation = relations(users, ({ many }) => ({
  rooms: many(rooms),
  messages: many(messages),
  usersToRoomsInvite: many(usersToRoomsInvite),
  messagesViews: many(messages),
}));

export { users, usersRelation };
