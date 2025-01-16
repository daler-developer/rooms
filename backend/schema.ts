import { boolean, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }),
  isBlocked: boolean("isBlocked").default(false),
});
