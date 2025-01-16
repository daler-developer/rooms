import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { users } from "./User";
import { rooms } from "./Room";
import { relations } from "drizzle-orm";
import { usersToRoomsInvite } from "./UsersToRoomsInvite";

const usersToRooms = pgTable(
  "users_to_rooms",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    roomId: integer("room_id")
      .notNull()
      .references(() => rooms.id),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.roomId] }),
  }),
);

const usersRelations = relations(users, ({ many }) => ({
  usersToRooms: many(usersToRooms),
}));

const roomsRelations = relations(rooms, ({ many }) => ({
  usersToRooms: many(usersToRooms),
}));

const usersToRoomsRelations = relations(usersToRooms, ({ one }) => ({
  room: one(rooms, {
    fields: [usersToRooms.roomId],
    references: [rooms.id],
  }),
  user: one(users, {
    fields: [usersToRooms.userId],
    references: [users.id],
  }),
}));

export { usersToRooms, usersRelations, roomsRelations, usersToRoomsRelations };
