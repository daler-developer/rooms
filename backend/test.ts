import redisClient from "./infrastructure/db/redisClient";

const start = async () => {
  await redisClient.on("error", (err) => console.log("Redis Client Error", err)).connect();

  const res = await redisClient.hGetAll("room:90:unread_messages");

  // console.log("res", res);
};

start();
