import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { users } from "./User";
import { rooms } from "./Room";

const usersToRoomsInvite = pgTable(
  "users_to_rooms_invite",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    roomId: integer("roomId")
      .notNull()
      .references(() => rooms.id),
    inviterId: integer("inviter_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.roomId] }),
  }),
);

const usersToRoomsInviteRelations = relations(usersToRoomsInvite, ({ one }) => ({
  room: one(rooms, {
    fields: [usersToRoomsInvite.roomId],
    references: [rooms.id],
  }),
  user: one(users, {
    fields: [usersToRoomsInvite.userId],
    references: [users.id],
  }),
}));

export { usersToRoomsInvite, usersToRoomsInviteRelations };
