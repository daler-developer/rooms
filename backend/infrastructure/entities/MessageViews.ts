import { integer, pgTable } from "drizzle-orm/pg-core";

const messageViews = pgTable("message_views", {
  userId: integer("user_id"),
  messageId: integer("message_id"),
});

export { messageViews };
