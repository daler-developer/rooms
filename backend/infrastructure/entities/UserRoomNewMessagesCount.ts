import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { users } from "./User";
import { rooms } from "./Room";
import { relations } from "drizzle-orm";
import { usersToRoomsInvite } from "./UsersToRoomsInvite";

const userRoomNewMessagesCount = pgTable(
  "user_room_new_messages_count",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    roomId: integer("room_id")
      .notNull()
      .references(() => rooms.id),
    count: integer("count").default(0),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.roomId] }),
  }),
);

const userRoomNewMessagesCountRelations = relations(userRoomNewMessagesCount, ({ one }) => ({
  room: one(rooms, {
    fields: [userRoomNewMessagesCount.roomId],
    references: [rooms.id],
  }),
  user: one(users, {
    fields: [userRoomNewMessagesCount.userId],
    references: [users.id],
  }),
}));

export { userRoomNewMessagesCountRelations, userRoomNewMessagesCount };
