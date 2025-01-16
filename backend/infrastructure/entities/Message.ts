import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { rooms } from "./Room";
import { users } from "./User";

const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  text: varchar("text", { length: 1000 }),
  roomId: integer("room_id"),
  senderId: integer("sender_id"),
  sentAt: timestamp("send_at", { mode: "string" }).default(null),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  viewsCount: integer("views_count").default(0),
  scheduledAt: timestamp("schedule_at", { mode: "string" }).default(null),
});

const messagesRelations = relations(messages, ({ one, many }) => ({
  room: one(rooms, {
    fields: [messages.roomId],
    references: [rooms.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
  viewers: many(users),
}));

export { messages, messagesRelations };
