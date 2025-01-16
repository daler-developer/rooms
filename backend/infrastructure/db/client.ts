import { Client } from "pg";

const client = new Client({
  host: "127.0.0.1",
  port: 5432,
  user: "dalersaidov",
  password: "",
  database: "dalersaidov",
});

export default client;
