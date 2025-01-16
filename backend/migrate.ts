import {} from "drizzle-orm/pg-core/utils";
import db from "./infrastructure/db";
import client from "./infrastructure/db/client";

const start = async () => {
  await migrate(db, { migrationsFolder: "./drizzle" });

  await client.end();
};

start();
