import { drizzle } from "drizzle-orm/node-postgres";
import client from "./client";

const db = drizzle(client);

export default db;
