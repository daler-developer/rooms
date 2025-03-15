import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./User";
import { usersToRoomsInvite } from "./UsersToRoomsInvite";
import { messages } from "./Message";

const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  creatorId: integer("creator_id"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  participantsCount: integer("participants_count").default(0),
  messagesCount: integer("messages_count").default(0),
  pendingInvitationsCount: integer("pending_invitations_count").default(0),
  thumbnailUrl: varchar("thumbnail_url", { length: 256 }).notNull().default("https://picsum.photos/id/234/300/300"),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
});

const roomsRelations = relations(rooms, ({ one, many }) => ({
  creator: one(users, {
    fields: [rooms.creatorId],
    references: [users.id],
  }),
  messages: many(messages),
}));

const usersToRoomsInviteRelations = relations(rooms, ({ many }) => ({
  usersToRoomsInvite: many(usersToRoomsInvite),
}));

export { rooms, roomsRelations, usersToRoomsInviteRelations };
