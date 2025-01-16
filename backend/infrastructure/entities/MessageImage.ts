import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { messages } from "./Message";

const messageImages = pgTable("message_images", {
  id: serial("id").primaryKey(),
  url: varchar("url", { length: 1000 }),
  messageId: integer("message_id"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

const messageImagesRelations = relations(messageImages, ({ one }) => ({
  message: one(messages, {
    fields: [messageImages.messageId],
    references: [messages.id],
  }),
}));

export { messageImages, messageImagesRelations };
