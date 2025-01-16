import { pgTable, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./User";
import { rooms } from "./Room";

const scheduledMessagesCount = pgTable("scheduled_messages_count", {
  userId: integer("user_id"),
  roomId: integer("room_id"),
  count: integer("count").default(0),
});

const scheduledMessagesCountRelations = relations(scheduledMessagesCount, ({ one }) => ({
  user: one(users, {
    fields: [scheduledMessagesCount.userId],
    references: [users.id],
  }),
  room: one(rooms, {
    fields: [scheduledMessagesCount.roomId],
    references: [rooms.id],
  }),
}));

export { scheduledMessagesCount, scheduledMessagesCountRelations };
