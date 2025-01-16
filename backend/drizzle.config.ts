import type { Config } from "drizzle-kit";

export default {
  schema: "./infrastructure/entities/**/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: "127.0.0.1",
    port: 5432,
    user: "dalersaidov",
    password: "",
    database: "dalersaidov",
  },
} satisfies Config;
